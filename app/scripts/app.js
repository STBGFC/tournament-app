'use strict';

angular
    .module('tournamentApp', [
        'tournament',
        'ui.router'
    ])
    .config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('competitionList', {
                url: '/',
                templateUrl: 'views/competitionlist.html',
                controller: 'CompetitionController'
            })
            .state('competitionView', {
                url: '/competition/:type/:name',
                templateUrl: 'views/competition.html',
                controller: 'CompetitionController'
            })
            .state('newsList', {
                url: '/news',
                templateUrl: 'views/news.html',
                controller: 'NewsController'
            })
            .state('admin', {
                url: '/admin',
                templateUrl: 'views/admin/main.html',
                controller: 'CompetitionController'
            })
            .state('admin.competition', {
                url: '/competition/:name/:section',
                templateUrl: 'views/admin/competition.html',
                controller: 'CompetitionController'
            })
        ;

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
