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

    .controller('TournamentController', function (Tournament, $scope) {
        $scope.tournament = Tournament.get();
    })

    .controller('CompetitionListController', function (Competition, $scope) {
        $scope.competitions = Competition.query();
    })

    .controller('CompetitionController', function (Competition, $scope, $state, $stateParams, $log) {
        $scope.competition = Competition.get({
            compName: $stateParams.name,
            compSection: $stateParams.section
        });

        $scope.$on('socket:result', function(event, data) {
            if (data.result) {
                var result = data.result;

                $('#videprinter').teletype({
                    text: [
                        data.compName + '/' + data.compSection + (data.group ? '/' + data.group : '') + ': ' +
                        result.homeTeam + ' ' + result.homeScore + '-' +
                        result.awayScore + ' ' + result.awayTeam
                    ]
                });

                // reload state if current
                if (data.compName === $stateParams.name && data.compSection === $stateParams.section) {
                    $state.reload();
                }
            }
            else {
                $log.warn('invalid result broadcast message received');
            }
        });
    })

    .controller('CompetitionAdminController', function (Competition, $scope, $state, $stateParams, $log) {
        $scope.competitions = Competition.query();

        $scope.createCompetition = function() {
            $log.info('Creating new competition: ' + JSON.stringify($scope.competition));
            var c = new Competition($scope.competition);
            c.$save(function() {
                $state.reload();
            });
        };
    })

    .controller('ResultAdminController', function(Result, $scope, $state, $log) {

        var getParams = function(localScope) {
            var params = {};
            params.compSection = $state.params.section;
            params.compName = $state.params.name;
            if (localScope.groupIndex !== 0) {
               params.groupOrResultId = localScope.groupIndex;
            }
            $log.debug("Params: " + JSON.stringify(params));
            return params;
        };

        $scope.newResult = {played: false};

        $scope.addResult = function() {
            var result = new Result($scope.newResult);

            result.played = (result.homeGoals >= 0);
            $log.info('Adding new result: ' + JSON.stringify(result));

            result.$save(getParams($scope), function() {
                // success
                $state.reload();
            });
        };

        $scope.updateResult = function(res) {
            var result = new Result(res);
            $log.info('Updating result: ' + JSON.stringify(result));
            result.$save(getParams($scope), function() {
                // success
                $state.reload();
            });
        };

        $scope.deleteResult = function(result) {
            $log.info('Deleting result: ' + JSON.stringify(result));
            Result.delete(result);
            $state.reload();
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
            if (data.title && data.body && data.created) {
                $log.debug('news received', data);
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
        return $resource('api/result/:compName/:compSection/:groupOrResultId', {
            compName:'@compName',
            compSection:'@compSection',
            groupId:'@groupOrResultId'
        });
    })

    .factory('Competition', function($resource) {
        return $resource('api/competition/:compName/:compSection');
    })

    .factory('Tournament', function($resource) {
        return $resource('api/tournament');
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
