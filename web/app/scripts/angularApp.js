(function() {
    'use strict';

    angular
        .module('stbgfc.tournament-app', [
            'stbgfc.tournament',
            'stbgfc.security',
            'ui.router',
            'ngAnimate'
        ])

        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'views/home.html'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'views/login.html'
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
                .state('feedback', {
                    url: '/feedback',
                    templateUrl: 'views/feedback.html'
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
                .state('admin.feedback', {
                    url: '/feedback',
                    templateUrl: 'views/admin/viewfeedback.html',
                    controller: 'FeedbackAdminController'
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

        .run(function ($rootScope, $state, $stateParams, $log, broadcastSocket) {

            // ensure the factory is init'd as we never use it directly
            $log.info(broadcastSocket);

            // Add references to $state and $stateParams to the $rootScope
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        })
    ;
})();

