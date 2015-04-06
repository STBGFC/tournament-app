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

    .controller('TournamentController', function (Tournament, $scope, $log) {
        $scope.tournament = Tournament.get();

        $scope.$on('socket:result', function(event, data) {
            if (data.result) {
                var result = data.result;
                var scoreline = result.homeTeam + ' ' + result.homeGoals;
                scoreline += (result.homePens ? '(' + result.homePens + ')-(' + result.awayPens + ')' : '-');
                scoreline += result.awayGoals + ' ' + result.awayTeam;
                $('#videprinter').teletype({
                    text: [data.compName + '/' + data.compSection + ' ' + scoreline]
                });
            }
            else {
                $log.warn('invalid news broadcast message received');
            }
        });
    })

    .controller('CompetitionListController', function (Competition, $scope) {
        $scope.competitions = Competition.query();
    })

    .controller('CompetitionController', function (Competition, $scope, $state, $stateParams) {
        $scope.competition = Competition.get({name: $stateParams.name, section: $stateParams.section});

        $scope.createCompetition = function() {
            var c = new Competition($scope.competition);
            c.$save(function() {
                // success
                $state.go(
                    'admin.competition',
                    {name: $scope.competition.name, section: $scope.competition.section}
                );

            }, function(httpResponse) {
                // fail
                console.log(httpResponse);
            });
        };
    })

    /*
    .controller('ResultController', function($scope, Competition) {
        if ($routeParams.compName != null) $scope.currentName = $routeParams.compName;
        if ($routeParams.compSection != null) $scope.currentSection = $routeParams.compSection;
        $scope.competition = Competition.get({compName: $scope.currentName, compSection: $scope.currentSection});
        $scope.newResult = {homeGoals: 0, awayGoals: 0};

        $scope.addResult = function() {
            var result = new Result($scope.newResult);
            var params = {};
            params.compSection = $scope.currentSection;
            params.compName = $scope.currentName;
            if ($scope.groupIndex != 0) {
               params.groupOrResultId = $scope.groupIndex;
            }

            result.$save(
                params,
                function(data, headers) {
                    // success
                    $route.reload();

                }, function(httpResponse) {
                    // fail
                    alert(httpResponse.status);
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

        $scope.deleteResult = function($scope, Result) {
            Result.remove({
                compName:   $routeParams.compName,
                compSection:$routeParams.compSection,
                groupOrResultId:   $routeParams.resultId
            }, function() {
                $location.path('competition/' + $routeParams.compName + '/' + $routeParams.compSection);
            });

    })
    */

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

    .controller('NewsController', function(News, $scope) {
        $scope.createNews = function() {
            var n = new News($scope.news);
            n.$save();
            $scope.news = {};
        };
    })

    // ============================================================================================
    // services
    // ============================================================================================

    .factory('Tournament', function($resource) {
        return $resource('/api/tournament');
    })

    .factory('Competition', function($resource) {
        return $resource('/api/competition/:name/:section', {
            name:'@name',
            section:'@section'
        });
    })

    .factory('News', function($resource) {
        return $resource('/api/news');
    })

    .factory('Result', function(/*$resource*/) {
        /*
        return $resource('api/result/:compName/:compSection/:groupOrResultId', {
               compName:'@compName',
               compSection:'@compSection',
               groupId:'@groupOrResultId'
            });
            */
    })

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
