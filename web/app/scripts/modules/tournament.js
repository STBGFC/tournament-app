'use strict';

angular
    .module('tournament', [
        'ngResource',
        'ui.utils',
        'ui.router',
        'btford.socket-io',
        'restangular'
    ])

    // ============================================================================================
    // controllers
    // ============================================================================================

    .controller('TournamentController', function (Restangular, $scope) {
        Restangular.one('tournament').get().then(function(tournament) {
            $scope.tournament = tournament;
        });
    })

    .controller('CompetitionListController', function (Restangular, $scope) {
        Restangular.all('competition').getList().then(function(competitions) {
            $scope.competitions = competitions;
        });
    })

    .controller('CompetitionController', function (Restangular, $scope, $state, $stateParams, $log) {
        Restangular.one('competition', $stateParams.name).one($stateParams.section).get().then(function (competition) {
            $scope.competition = competition;
        });

        $scope.$on('socket:result', function(event, data) {
            if (data.result) {
                var result = data.result;
                var scoreline = result.homeTeam + ' ' + result.homeGoals;
                scoreline += (result.homePens ? '(' + result.homePens + ')-(' + result.awayPens + ')' : '-');
                scoreline += result.awayGoals + ' ' + result.awayTeam;
                $('#videprinter').teletype({
                    text: [data.compName + '/' + data.compSection + ' ' + scoreline]
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

    .controller('CompetitionAdminController', function (Restangular, $scope, $state, $stateParams, $log) {
        Restangular.all('competition').getList().then(function(competitions) {
            $scope.competitions = competitions;
        });

        $scope.createCompetition = function() {
            var c = Restangular.post($scope.competition);
            c.$save(function() {
                // success
                $state.go(
                    'admin.competition',
                    {name: $scope.competition.name, section: $scope.competition.section}
                );

            }, function(httpResponse) {
                // fail
                $log.error(httpResponse);
            });
        };
    })

    .controller('ResultController', function($scope, $log) {
        $log.debug($scope); //remove this
    })
/*
    .controller('ResultAdminController', function($scope, Restangular, $log) {

        if ($routeParams.compName !== null) {
            $scope.currentName = $routeParams.compName;
        }

        if ($routeParams.compSection !== null) {
            $scope.currentSection = $routeParams.compSection;
        }

        $scope.competition = Competition.get({compName: $scope.currentName, compSection: $scope.currentSection});

        $scope.newResult = {homeGoals: 0, awayGoals: 0};

        $scope.addResult = function($state) {
            var result = new Result($scope.newResult);
            var params = {};
            params.compSection = $scope.currentSection;
            params.compName = $scope.currentName;
            if ($scope.groupIndex !== 0) {
               params.groupOrResultId = $scope.groupIndex;
            }

            result.$save(
                params,
                function() {
                    // success
                    $state.reload();
                }, function(httpResponse) {
                    // fail
                    $log.error(httpResponse.status);
                }
            );
        };

        $scope.setTeam = function(teamName, isHome) {
            if (isHome) {
                $scope.newResult.homeTeam = teamName;
            }
            else {
                $scope.newResult.awayTeam = teamName;
            }
        };

        $scope.deleteResult = function($scope, Result, $state, $stateParams) {
            Result.remove({
                compName: $stateParams.compName,
                compSection: $stateParams.compSection,
                groupOrResultId: $stateParams.resultId
            }, function () {
                $state.go('admin.competition');
            });
        };
    })
*/
    .controller('NewsListController', function (Restangular, $scope, $log) {
        Restangular.all('news').getList().then(function(news) {
            $scope.newsItems = news;
        });

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

    .controller('NewsController', function(Restangular, $scope) {
        $scope.createNews = function() {
            var n = Restangular.post($scope.news);
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
