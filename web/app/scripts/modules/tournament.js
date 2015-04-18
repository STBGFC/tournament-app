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

    .controller('ResultsController', function (Tournament, Result, $scope, $state, $stateParams, $log) {

        // build the UI view of the competition
        var competition  = {
            name: $stateParams.name,
            section: $stateParams.section,
            results: []
        };

        var tourneys = Tournament.query(function() {
            $scope.tournament = tourneys[0];

            // awkward.. find the competition on the tournament and populate the UI version based on attributes
            for (var c = 0; c < $scope.tournament.competitions.length; c++) {
                var it = $scope.tournament.competitions[c];
                if (it.name === $stateParams.name && it.section === $stateParams.section) {
                    // populate groups array
                    competition.groups = [];
                    for (var j = 0; j < it.groups; j++) {
                        competition.groups.push({
                            results: [],
                            table: []
                        });
                    }
                }
            }

            // fetch results for the competition and split into groups in the scope
            var compResults = Result.query({
                conditions:'{"competition.name":"' + $stateParams.name + '","competition.section":"' + $stateParams.section + '"}'
            }, function() {
                // split the results up into their groups
                for (var i=0; i < compResults.length; i++) {
                    var res = compResults[i];
                    if ('group' in res.competition) {
                        competition.groups[res.competition.group - 1].results.push(res);
                        updateTable(res, competition.groups[res.competition.group - 1].table);
                    }
                    else {
                        competition.results.push(res);
                    }
                }
            });
        });

        /*
         * given a single result and a current table (which can be the empty array []),
         * return an updated set of entries
         */
        var updateTable = function(newResult, table) {
            if ('homeGoals' in newResult) {
                var hg = newResult.homeGoals;
                var ag = newResult.awayGoals;
                var ht = findEntryInTable(newResult.homeTeam, table);
                var at = findEntryInTable(newResult.awayTeam, table);
                applyRes(ht, hg, ag);
                applyRes(at, ag, hg);
                table.sort(leagueComparator);
            }
        };

        var findEntryInTable = function(name, table) {
            for (var i = 0; i < table.length; i++) {
                if (table[i].name === name) return table[i];
            }

            var entry = {played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0};
            entry.name = name;
            table.push(entry);
            return entry;
        };

        /*
         * function to apply a result to an existing table of entries in order to
         * update them.  The entries can then be resorted using the comparator
         */
        var applyRes = function(entry, myGoals, yourGoals) {
            entry.played++;
            entry.won += (myGoals > yourGoals ? 1 : 0);
            entry.drawn += (myGoals === yourGoals ? 1 : 0);
            entry.lost += (myGoals < yourGoals ? 1 : 0);
            entry.goalsFor += myGoals;
            entry.goalsAgainst += yourGoals;
            entry.points += (myGoals > yourGoals ? 3 : (myGoals === yourGoals ? 1 : 0));
            return entry;
        };

        /*
         * comparator to sort an array of table entries using the most common mechanics
         * for European sports leagues (by points, then GD, then goals scored, then wins)
         */
        var leagueComparator = function(a, b) {
            // points
            if (a.points > b.points) return -1;
            if (a.points < b.points) return 1;

            // GD
            var aGD = a.goalsFor - a.goalsAgainst;
            var bGD = b.goalsFor - b.goalsAgainst;
            if (aGD > bGD) return -1;
            if (aGD < bGD) return 1;

            // scored
            if (a.goalsFor > b.goalsFor) return -1;
            if (a.goalsFor < b.goalsFor) return 1;

            // wins
            if (a.won > b.won) return -1;
            if (a.won < b.won) return 1;

            // name
            return (a.name < b.name);
        };


        // assign local setup to $scope
        $scope.competition = competition;

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
                if (result.competition.name === competition.name && result.competition.section === competition.section) {
                    $state.reload();
                }
            }
            else {
                $log.warn('invalid result broadcast message received: ' + JSON.stringify(result));
            }
        });

        $scope.createResult = function(group) {
            var result = new Result($scope.newResult);
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
            var result = new Result(res);
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
