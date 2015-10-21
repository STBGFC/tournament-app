'use strict';

describe ('Tournament Tests', function() {

    var $httpBackend;

    beforeEach(module('stbgfc.tournament'));

    describe('TournamentController', function () {
        var scope, Tournament;

        beforeEach(
            inject(function(_Tournament_, _$httpBackend_, $rootScope, $controller) {
                Tournament = _Tournament_;
                /*
                spyOn(Tournament, 'query').and.callFake(function() {
                    scope.tournament = tournamentData;
                });
                */
                $httpBackend = _$httpBackend_;
                scope = $rootScope.$new();
                $controller('TournamentController', {$scope: scope});

                $httpBackend
                    .whenGET('api/tournaments').respond([tournamentData]);
                $httpBackend.flush();
            })
        );

        it('should attach the tournament to the scope', function () {
            expect(scope.tournament.name).toEqual('Karma Tournament');
            expect(scope.tournament.competitions.length).toBe(5);
        });

        it('should attach one competition to the scope', function () {
            scope.createCompetition({name: 'U11', section: 'All', groups: 2});
            expect(scope.tournament.competitions.length).toBe(6);
            expect(scope.tournament.competitions[5].name).toBe('U11');
        });

    });

    describe('ResultsController', function () {
        var scope, Result, stateParams;

        beforeEach(
            inject(function(_Result_, _$httpBackend_, $rootScope, $controller) {
                Result = _Result_;
                $httpBackend = _$httpBackend_;
                scope = $rootScope.$new();
                scope.tournament = tournamentData;
                stateParams = {name:'U8', section:'A'};
                $controller('ResultsController', {$scope: scope, $stateParams: stateParams, Result: Result});
            })
        );

        it('should setup a new result', function () {
            scope.createResult();
            expect(scope.newResult).toBeDefined();
            expect(scope.newResult.index).toBe(1000);
        });

        it('should save a new result in group 1', function() {
            $httpBackend
                .whenGET('api/results?conditions=%7B%22competition.name%22:%22U8%22,%22competition.section%22:%22A%22%7D')
                .respond([newResultData]);
            $httpBackend.whenPOST('/api/results').respond(newResultData);
            $httpBackend.flush();

            scope.newResult = newResultData;
            scope.saveResult(1);
            var gresults = scope.competition.groups[0].results;
            expect(gresults.length).toBe(1);
            expect(gresults[0].homeTeam).toEqual('Foo');
            expect(scope.newResult).toEqual({});
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
            {name: 'U8', section: 'A', groups: 4},
            {name: 'U8', section: 'B', groups: 4},
            {name: 'U9', section: 'A', groups: 4},
            {name: 'U9', section: 'Champions League', groups: 2},
            {name: 'U9', section: 'Europa League', groups: 2}
        ]
    };

    var newResultData = {
        index: 1000,
        homeTeam: 'Foo',
        awayTeam: 'Bar',
        tag: '1',
        competition: {
            name: 'U10',
            section: 'A',
            group: 1
        }
    };
/*
    var competitionData = {
        name: 'U10',
        section: 'A',
        groups: [
            {results:[], table:[]}
        ],
        results: [],
        currentGroup: 1
    };
*/
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
