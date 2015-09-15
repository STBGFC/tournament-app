'use strict';

describe ('Tournament Tests', function() {

    beforeEach(module('stbgfc.tournament'));

    describe('TournamentController', function () {
        var scope, Tournament;

        beforeEach(
            inject(function(_Tournament_, $rootScope, $controller) {
                Tournament = _Tournament_;
                spyOn(Tournament, 'query').and.callFake(function() {
                    scope.tournament = tournamentData;
                });
                scope = $rootScope.$new();
                $controller('TournamentController', {$scope: scope});
            })
        );

        it('should attach the tournament to the scope', function () {
            expect(scope.tournament).toBe(tournamentData);
        });

        it('should attach one competition to the scope', function () {
            scope.createCompetition({name: 'U9', section: 'All', groups: 2});
            expect(scope.tournament.competitions.length).toBe(2);
            expect(scope.tournament.competitions[1].name).toBe('U9');
        });

    });

    describe('ResultsController', function () {
        var scope, Tournament, Result;

        beforeEach(
            inject(function(_Tournament_, _Result_, $rootScope, $controller) {
                Tournament = _Tournament_;
                Result = _Result_;
                spyOn(Tournament, 'query').and.callFake(function() {
                    scope.tournament = tournamentData;
                });
                scope = $rootScope.$new();
                $controller('ResultsController', {$scope: scope});
            })
        );

        it('should attach a list of competitions to the scope', function () {
            expect(scope.tournament.competitions.length).toBe(2);
        });

    });

    describe('NewsListController', function () {

        var scope, News;

        beforeEach(
            inject(function(_News_, $rootScope, $controller) {
                News = _News_;
                spyOn(News, 'query').and.callFake(function() {
                    scope.latestNews = newsItemData[newsItemData.length - 1];
                    scope.newsItems = newsItemData;
                });
                scope = $rootScope.$new();
                $controller('NewsListController', {$scope: scope});
            })
        );


        it('should attach a list of news items to the scope', function () {
            expect(scope.latestNews).toBe(newsItemData[newsItemData.length - 1]);
            //expect(scope.newsItems).toBe(newsItemData);
        });

    });



    // ============================================================================================
    // fixtures
    // ============================================================================================

    var tournamentData = {
        name: 'Karma Tournament',
        description: 'Welcome to our Karma Tournament',
        current: true,
        club: 'Jasmine',
        siteUrl: 'http://www.example.com',
        competitions: [
            {name: 'U8', section: 'A', groups: 4}
        ],
        $update: function() {console.log('updating tournament');}
    };

    var newsItemData = [
        {
            created: new Date('2015/5/12 12:26:32'),
            title: 'Yet More Newsy Type Stuff',
            body: 'This is the body of the news.  Please take careful note of it :)'
        },
        {
            created: new Date('2015/4/1 11:17:32'),
            title: 'News Henin Dude',
            body: 'This is the body of the news.  Please take careful note of it s adfsgfsd fgdsf gs fg :)'
        },
        {
            created: new Date('2015/4/11 10:13:32'),
            title: 'More News',
            body: 'This is the body of the news.  Please take careful note of it :)'
        },
        {
            created: new Date('2015/4/9 17:47:32'),
            title: 'Stuff\'s Occurin\'',
            body: 'This is the body of the news.  Please take careful note of it.  This is a rather longer news item too with a bunch of random, generic filler text - probably should have just used Lorum Ipsum to be honest, but I couldn\'t be arsed to google it.'
        }
    ];
});
