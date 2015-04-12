'use strict';

angular
    .module('tournament', [
        'ngResource',
        'ui.utils',
        'ui.router',
        'btford.socket-io'
    ])

    // ============================================================================================
    // controllers
    // ============================================================================================

    .controller('TournamentController', function (Tournament, $scope, $state, $log) {
        var tourneys = Tournament.query(function() {
            $scope.tournament = tourneys[0];
        });

        $scope.createCompetition = function(newComp) {
            $log.info('Creating new competition: ' + JSON.stringify(newComp));
            $scope.tournament.competitions.push(newComp);
            $scope.tournament.$update(function() {
                $state.reload();
            });
        };
    })

    .controller('ResultsController', function (Result, $scope, $state, $stateParams, $log) {

        // build the UI view of the competition
        $scope.competition = {
            name: $stateParams.name,
            section: $stateParams.section
        };

        // fetch results for the competition and split into groups in the scope
        var compResults = Result.query({
            conditions:'{"competition.name":"' + $stateParams.name + '","competition.section":"' + $stateParams.section + '"}'
        }, function() {

            var localGroups = [], localKO = [];

            // split the results up into their groups
            for (var i=0; i<compResults.length; i++) {
                var res = compResults[i];
                if ('group' in res.competition) {
                    // ensure groups exist
                    while (localGroups.length < res.competition.group) {
                        localGroups.push({results: [], table: []});
                    }
                    localGroups[res.competition.group - 1].results.push(res);
                }
                else {
                    localKO.push(res);
                }
            }

            $scope.competition.groups = localGroups;
            $scope.competition.results = localKO;
        });

        // form backing object for additional results in any section
        $scope.newResult = {};

        /*
         * event handler for results broadcast over the websocket
         */
        $scope.$on('socket:result', function(event, data) {
            var result = data;
            if ('competition' in result && 'homeTeam' in result) {

                $('#videprinter').teletype({
                    text: [
                        result.competition.name + '/' + result.competition.section + (result.competition.group ? '/' + result.competition.group : '') + ': ' +
                        result.homeTeam + ' ' + result.homeScore + '-' +
                        result.awayScore + ' ' + result.awayTeam
                    ]
                });

                // TODO: update the scope, do not reload the state (screen flicker and loss of work in admin screen will ensue)
                if (result.competition.name === $stateParams.name && result.competition.section === $stateParams.section) {
                    $state.reload();
                }
            }
            else {
                $log.warn('invalid result broadcast message received: ' + JSON.stringify(result));
            }
        });

        /*
         * result C-UD and helper methods below
         */
        var calculate = function(result) {
            if ('homeGoals' in result) {
                result.homeScore = '' + result.homeGoals;
                result.awayScore = '' + result.awayGoals;
                if ('homePens' in result) {
                    result.homeScore += ' (' + result.homePens + ')';
                    result.awayScore += ' (' + result.awayPens + ')';
                }
            }
            return result;
        };

        $scope.createResult = function(group) {
            var result = new Result(calculate($scope.newResult));
            result.competition = {
                name: $stateParams.name,
                section: $stateParams.section
            };
            if (group > 0) result.competition.group = group;
            $log.info('Creating result: ' + JSON.stringify(result));
            result.$save(function() {
                // success
                $state.reload();
            });
        };

        $scope.updateResult = function(res) {
            var result = new Result(calculate(res));
            $log.info('Updating result: ' + JSON.stringify(result));
            result.$update(function() {
                // success
                $state.reload();
            });
        };

        $scope.deleteResult = function(result) {
            $log.info('Deleting result: ' + JSON.stringify(result));
            result.$delete();
            $state.reload(function() {
                // success
                $state.reload();
            });
        };

        $scope.setTeam = function(teamName, isHome) {
            if (isHome) {
                $scope.newResult.homeTeam = teamName;
            }
            else {
                $scope.newResult.awayTeam = teamName;
            }
        };
    })

    .controller('NewsListController', function (News, $scope, $log) {
        $scope.newsItems = News.query();
        $scope.searchBy = '';

        // socket broadcasts
        $scope.$on('socket:news', function(event, data) {
            $log.debug('news received', data);
            if (data.title && data.body && data.created) {
                $scope.announcement = data;
                $scope.newsItems.push(data);

                // OMG! this is awful.. jQuery from inside a controller. Please help!
                $('#newsalert').modal({backdrop: false});
            }
            else {
                $log.warn('invalid news broadcast message received');
            }
        });
    })

    .controller('NewsAdminController', function(News, $scope, $log) {
        $scope.createNews = function() {
            $log.info('Creating new announcement: ' + JSON.stringify($scope.news));
            var n = new News($scope.news);
            n.$save();
            $scope.news = {};
        };
    })

    // ============================================================================================
    // services
    // ============================================================================================

    .factory('broadcastSocket', function(socketFactory) {
        var s = socketFactory();
        s.forward('news');
        s.forward('result');
        return s;
    })

    .factory('Result', function($resource) {
        return $resource('api/results/:id', { id: '@_id' }, {
            update: {method:'PUT'}
        });
    })

    .factory('Tournament', function($resource) {
        return $resource('api/tournaments/:id', { id: '@_id' }, {
            update: {method:'PUT'}
        });
    })

    .factory('News', function($resource) {
        return $resource('api/news');
    })


    // ============================================================================================
    // directives
    // ============================================================================================

    /*
     * simulate the tab switching behaviour for bootstrap tabs
     */
    .directive('showTab', function () {
        return {
            link: function (scope, element) {
                element.click(function(e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        };
    })

    /*
     * simulate the accordion for bootstrap elements
     */
    .directive('toggleNews', function () {
        return {
            link: function (scope, element) {
                var toggleAccordion = function(e) {
                    e.preventDefault();
                };
                element.click(toggleAccordion);
                $('#accordion')
                    .on('hidden.bs.collapse', toggleAccordion)
                    .on('shown.bs.collapse', toggleAccordion);
            }
        };
    })
;
