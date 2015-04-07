'use strict';

angular
    .module('tournamentApp', [
        'tournament',
        'ui.router',
        'restangular'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'CompetitionListController'
            })
            .state('competitionView', {
                url: '/competition/:name/:section',
                templateUrl: 'views/competition.html',
                controller: 'CompetitionController'
            })
            .state('newsList', {
                url: '/news',
                templateUrl: 'views/news.html',
                controller: 'NewsListController'
            })
            .state('admin', {
                url: '/admin',
                templateUrl: 'views/admin/main.html',
                controller: 'CompetitionListController'
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
    .run(function ($rootScope, $state, $stateParams, $log, broadcastSocket, Restangular) {

        // global Restangular config
        Restangular.setBaseUrl('/api');

        // ensure the factory is init'd as we never use it directly
        console.log(broadcastSocket);

        // Add references to $state and $stateParams to the $rootScope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    })
;
