'use strict';

describe ('Tournament Tests', function() {

    beforeEach(module('tournamentApp'));
    beforeEach(module('ui.unique'));

    describe('Controller: TournamentController', function () {

        /*
        var scope;

        var tournamentData = {
            name: 'Karma Tournament',
            description: 'Welcome to our Karma Tournament',
            current: true,
            club: 'STBGFC',
            siteUrl: 'https://www.stbgfc.co.uk'
        };

        beforeEach(
            inject(function($rootScope, $controller) {
                scope = $rootScope.$new();
                $controller('TournamentController', {$scope: scope});
            })
        );

        it('should attach the tournament to the scope', function () {
            expect(scope.tournament.name).toBe('Karma Tournament');
            expect(scope.tournament.description).toBe('Welcome to our Karma Tournament');
        });
        */

    });

    describe('Controller: CompetitionController', function () {

        var scope;

        beforeEach(
            inject(function($rootScope, $controller) {
                scope = $rootScope.$new();
                $controller('CompetitionController', {$scope: scope});
            })
        );

        it('should attach a list of competitions to the scope', function () {
            expect(scope.competitions.length).toBe(9);
        });

        it('should attach one competition to the scope', function () {
            expect(scope.competition.section).toBe('A');
            expect(scope.competition.name).toBe('U9');
        });

    });

    describe('Controller: NewsController', function () {

        /*
        this is p*ing me off now.. how difficult does it need to be to mock a
        service and inject it?  The (non-working) code below is about the 25th
        version, based on about 15 different blog posts plus the angular and
        jasmine docs. Not a single one has compiled and run.  Sigh.


        var $scope;
        var mockNewsService;

        beforeEach(function() {
            spyOn(mockNewsService, 'get').andCallThrough();
            inject(function ($rootScope, $controller) {
                $scope = $rootScope.$new();
                mockNewsService.get.andReturn(items);
                $controller('NewsController', {$scope: $scope, News: mockNewsService});
            });
        });

        var items = [
            {
                created: new Date('2015/5/12 12:26:32'),
                title: 'Yet More Newsy Type Stuff',
                body: 'This is the body of the news.  Please take carful note of it :)'
            },
            {
                created: new Date('2015/4/1 11:17:32'),
                title: 'News Henin Dude',
                body: 'This is the body of the news.  Please take carful note of it s adfsgfsd fgdsf gs fg :)'
            },
            {
                created: new Date('2015/4/11 10:13:32'),
                title: 'More News',
                body: 'This is the body of the news.  Please take carful note of it :)'
            },
            {
                created: new Date('2015/4/9 17:47:32'),
                title: 'Stuff\'s Occurin\'',
                body: 'This is the body of the news.  Please take carful note of it.  This is a rather longer news item too with a bunch of random, generic filler text - probably should have just used Lorum Ipsum to be honest, but I couldn\'t be arsed to google it.'
            }
        ];


        it('should attach a list of news items to the scope', function () {
            expect(mockNewsService.get).toHaveBeenCalled();
            expect($scope.newsItems.length).toBe(4);
            expect($scope.newsItems).toEqual(items);
        });
        */
    });
});
