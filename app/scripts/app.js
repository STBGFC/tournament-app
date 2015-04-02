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
                controller: 'AdminCompetitionController'
            })
            .state('admin.competition', {
                url: '',
                templateUrl: 'views/admin/competition.html'
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
