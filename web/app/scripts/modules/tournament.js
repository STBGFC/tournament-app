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

                $('#videprinter').teletype({
                    text: [
                        data.compName + '/' + data.compSection + ' ' + (data.group ? '/' + data.group : '') +
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

    .controller('CompetitionAdminController', function (Restangular, $scope, $state, $stateParams, $log) {
        Restangular.all('competition').getList().then(function(competitions) {
            $scope.competitions = competitions;
        });

        $scope.createCompetition = function() {
            $log.info('Creating new competition: ' + JSON.stringify($scope.competition));
            //Restangular.post($scope.competition);
        };
    })

    .controller('ResultController', function($scope, $log) {
        $log.debug($scope); //remove this
    })

    .controller('ResultAdminController', function($scope, Restangular, $state, $log) {
        $scope.newResult = {played: false};

        $scope.addResult = function() {
            var res = $scope.newResult;
            var params = {};
            params.compSection = $scope.currentSection;
            params.compName = $scope.currentName;

            res.played = (res.homeGoals >= 0);
            $log.info('Adding new result: ' + JSON.stringify(res));

            //Restangular.post(res, params);
            if ($scope.groupIndex !== 0) {
               params.groupOrResultId = $scope.groupIndex;
            }
        };

        $scope.updateResult = function(result) {
            $log.info('Updating result: ' + JSON.stringify(result));
            //Restangular.put(result);
            $state.reload();
        };

        $scope.deleteResult = function(result) {
            $log.info('Deleting result: ' + JSON.stringify(result));
            //Restangular.delete(result);
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

    .controller('NewsAdminController', function(Restangular, $scope, $log) {
        $scope.createNews = function() {
            $log.info('Creating new announcement: ' + JSON.stringify($scope.news));
            //Restangular.post($scope.news);
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
