'use strict';

angular
    .module('tournament', [
        'ngResource',
        'ui.utils',
        'ui.router'
    ])

    // ============================================================================================
    // controllers
    // ============================================================================================

    .controller('TournamentController', function (Tournament, $scope) {
        $scope.tournament = Tournament.get();
    })

    .controller('CompetitionListController', function (Competition, $scope, $state) {
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

    .controller('NewsController', function (News, $scope) {
        $scope.newsItems = News.query();
        $scope.searchBy = '';

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
     * simulate the popver for bootstrap elements
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
    });
