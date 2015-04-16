'use strict';

angular
    .module('tournamentApp', [
        'tournament',
        'ui.router'
    ])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html'
            })
            .state('resultsView', {
                url: '/results/:name/:section',
                templateUrl: 'views/results.html',
                controller: 'ResultsController'
            })
            .state('newsList', {
                url: '/news',
                templateUrl: 'views/news.html',
                controller: 'NewsListController'
            })
            .state('admin', {
                url: '/admin',
                templateUrl: 'views/admin/main.html'
            })
            .state('admin.results', {
                url: '/results/:name/:section',
                templateUrl: 'views/admin/results.html',
                controller: 'ResultsController'
            })
            .state('admin.createnews', {
                url: '/createnews',
                templateUrl: 'views/admin/createnews.html',
                controller: 'NewsAdminController'
            })
            .state('admin.createcompetition', {
                url: '/createcompetition',
                templateUrl: 'views/admin/createcompetition.html'
            })
        ;

        $urlRouterProvider
            .otherwise('/');
    }])

    .run(function (Tournament, $rootScope, $state, $stateParams, $log, broadcastSocket) {

        // add the Tournament at root scope
        var tourneys = Tournament.query(function() {
            $rootScope.tournament = tourneys[0];
        });

        // ensure the factory is init'd as we never use it directly
        console.log(broadcastSocket);

        // Add references to $state and $stateParams to the $rootScope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    })
;
