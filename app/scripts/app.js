'use strict';

angular
    .module('tournamentApp', [
        'tournament.user',
        'tournament.admin',
        'ui.router'
    ])
    .config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('competitionList', {
                url: '/',
                templateUrl: 'views/competitionlist.html',
                controller: 'CompetitionListController'
            })
            .state('editComp', {
                url: '/competition/:type/:name',
                templateUrl: 'views/competition.html',
                controller: 'CompetitionController'
            })
            .state('news', {
                url: '/news',
                templateUrl: 'views/news.html',
                controller: 'NewsController'
            })
            .state('adminComp', {
                url: '/admin/competition',
                templateUrl: 'views/admin/competitionEntry.html',
                controller: 'AdminCompetitionController'
            });

        $urlRouterProvider
            .otherwise('/');
    }])
    .run(['$rootScope', '$state', '$stateParams', function ($rootScope,   $state,   $stateParams) {
            // Add references to $state and $stateParams to the $rootScope
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ])
;
