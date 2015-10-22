'use strict';

describe ('Tournament Tests', function() {

    var $httpBackend;
    var customMatchers = {
        toEqualData: function () {
            return {
                compare: function (actual, expected) {
                    if (expected === undefined) {
                        expected = '';
                    }
                    return {pass:  angular.equals(actual, expected)};
                }
            };
        }
    };

    beforeEach(module('stbgfc.tournament'));

    beforeEach(function () {
        jasmine.addMatchers(customMatchers);
    });

    describe('TournamentController', function () {
        var scope, Tournament;

        beforeEach(
            inject(function(_Tournament_, _$httpBackend_, $rootScope, $controller) {
                Tournament = _Tournament_;
                $httpBackend = _$httpBackend_;
                scope = $rootScope.$new();
                $controller('TournamentController', {$scope: scope});

                $httpBackend
                    .whenGET('api/tournaments').respond([tournamentData]);
                $httpBackend.flush();
            })
        );

        it('should attach the tournament to the scope', function () {
            expect(scope.tournament).toEqualData(tournamentData);
        });

        it('should attach one competition to the scope', function () {
            scope.createCompetition({name: 'U11', section: 'All', groups: 2});
            expect(scope.tournament.competitions.length).toBe(6);
            expect(scope.tournament.competitions[5].name).toBe('U11');
        });

    });

    describe('ResultsController', function () {
        var scope, Result, stateParams;
        var qry = 'api/results?conditions=%7B%22competition.name%22:%22U8%22,%22competition.section%22:%22A%22%7D';

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

        it('should populate groups and results for the competition in scope', function() {
            $httpBackend
                .whenGET(qry)
                .respond(u8GroupResults); 
            $httpBackend.flush();
            var grps = scope.competition.groups;
            expect(grps.length).toBe(4);
            expect(grps[0].results.length).toBe(6);
            expect(grps[1].results[0].homeTeam).toEqual('Rotherham');
            expect(grps[0].table.length).toBe(4);
            expect(grps[0].table[0].name).toBe('Sheffield Wednesday');
            expect(grps[1].table.length).toBe(0);
        });

        it('should setup a new result', function () {
            scope.createResult();
            expect(scope.newResult).toBeDefined();
            expect(scope.newResult.index).toBe(1000);
        });

        it('should save a new result in group 1', function() {
            $httpBackend
                .whenGET(qry)
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

    describe('ResultEditController', function () {
        var scope, Result, state, stateParams;

        beforeEach(
            inject(function(_Result_, _$httpBackend_, $rootScope, $controller) {
                Result = _Result_;
                $httpBackend = _$httpBackend_;
                $httpBackend.whenGET('api/results/dead012345beef')
                    .respond(newResultData);
                scope = $rootScope.$new();
                scope.tournament = tournamentData;
                state = {
                    go: function(a, b) {
                        console.log('state.go called with ' + a + ' and ' + b);
                    }
                };
                spyOn(state, 'go').and.callThrough();
                stateParams = {id:'dead012345beef'};
                $controller('ResultEditController', {$scope: scope, $stateParams: stateParams, $state: state, Result: Result});
            })
        );

        it('should add or subtract goals from teams in a match', function() {
            $httpBackend.flush();
            expect(scope.result).toEqualData(newResultData);

            // add a home goal should also init away score to 0
            scope.addGoal(true, 1);
            expect(scope.result.homeGoals).toBe(1);
            expect(scope.result.awayGoals).toBe(0);

            scope.addGoal(true, -1);
            expect(scope.result.homeGoals).toBe(0);
            expect(scope.result.awayGoals).toBe(0);

            scope.addGoal(false, 1);
            scope.addGoal(false, 1);
            expect(scope.result.homeGoals).toBe(0);
            expect(scope.result.awayGoals).toBe(2);

            scope.addGoal(false, -1);
            expect(scope.result.homeGoals).toBe(0);
            expect(scope.result.awayGoals).toBe(1);
        });

        it('should add or subtract penalties in knockout games', function() {
            $httpBackend.flush();

            scope.goalEntry = false;
            expect(scope.result).toEqualData(newResultData);

            // add a home goal should also init away score to 0
            scope.addGoal(true, 1);
            expect(scope.result.homeGoals).toBe(0);
            expect(scope.result.awayGoals).toBe(0);
            expect(scope.result.homePens).toBe(1);
            expect(scope.result.awayPens).toBe(0);

            scope.addGoal(false, 2);
            expect(scope.result.homePens).toBe(1);
            expect(scope.result.awayPens).toBe(2);
        });

        it('should update an edited result', function() {
            $httpBackend.whenPUT('api/results/dead012345beef')
                    .respond({});
            $httpBackend.flush();
            
            scope.result._id = 'dead012345beef';
            scope.updateResult(scope.result);
            // TODO: expect(state.go).toHaveBeenCalledWith('resultsGroup', {name: 'U10', section: 'A', group: 1});
        });
    });

    describe('NewsListController', function () {
        var scope, News;

        beforeEach(
            inject(function(_News_, _$httpBackend_, $rootScope, $controller) {
                News = _News_;
                $httpBackend = _$httpBackend_;
                scope = $rootScope.$new();
                $controller('NewsListController', {$scope: scope});

                $httpBackend
                    .whenGET('api/news').respond(newsItemData);
                $httpBackend.flush();
            })
        );

        it('should attach a list of news items to the scope', function () {
            expect(scope.latestNews).toEqualData(newsItemData[newsItemData.length-1]);
            expect(scope.newsItems[0].title).toEqual('News1');
            expect(scope.newsItems[0].body).toEqual('This is the body of the news.  Please take careful note of it :)');
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

    var u8GroupResults = [
        {'__v':0,'index':1,'pitch':'5','competition':{'name':'U8', 'section':'Groups', 'group':'1'},'tag':'1', 'homeTeam':'Sheffield Wednesday', 'awayTeam':'Brentford', 'homeGoals':2, 'awayGoals':0},
        {'__v':0,'index':2,'pitch':'5','competition':{'name':'U8', 'section':'Groups', 'group':'1'},'tag':'2', 'homeTeam':'Derby County', 'awayTeam':'Middlesbrough', 'homeGoals': 0, 'awayGoals': 0},
        {'__v':0,'index':3,'pitch':'5','competition':{'name':'U8', 'section':'Groups', 'group':'1'},'tag':'3', 'homeTeam':'Derby County', 'awayTeam':'Sheffield Wednesday', 'homeGoals': 0, 'awayGoals': 3},
        {'__v':0,'index':4,'pitch':'5','competition':{'name':'U8', 'section':'Groups', 'group':'1'},'tag':'4', 'homeTeam':'Brentford', 'awayTeam':'Middlesbrough'},
        {'__v':0,'index':5,'pitch':'5','competition':{'name':'U8', 'section':'Groups', 'group':'1'},'tag':'5', 'homeTeam':'Middlesbrough', 'awayTeam':'Sheffield Wednesday'},
        {'__v':0,'index':6,'pitch':'5','competition':{'name':'U8', 'section':'Groups', 'group':'1'},'tag':'6', 'homeTeam':'Brentford', 'awayTeam':'Derby County'},
        {'__v':0,'index':7,'pitch':'6','competition':{'name':'U8', 'section':'Groups', 'group':'2'},'tag':'1', 'homeTeam':'Rotherham', 'awayTeam':'Cardiff'},
        {'__v':0,'index':8,'pitch':'6','competition':{'name':'U8', 'section':'Groups', 'group':'2'},'tag':'2', 'homeTeam':'MK Dons', 'awayTeam':'Bristol City'},
        {'__v':0,'index':9,'pitch':'6','competition':{'name':'U8', 'section':'Groups', 'group':'2'},'tag':'3', 'homeTeam':'MK Dons', 'awayTeam':'Rotherham'},
        {'__v':0,'index':10,'pitch':'6','competition':{'name':'U8', 'section':'Groups', 'group':'2'},'tag':'4', 'homeTeam':'Cardiff', 'awayTeam':'Bristol City'},
        {'__v':0,'index':11,'pitch':'6','competition':{'name':'U8', 'section':'Groups', 'group':'2'},'tag':'5', 'homeTeam':'Bristol City', 'awayTeam':'Rotherham'},
        {'__v':0,'index':12,'pitch':'6','competition':{'name':'U8', 'section':'Groups', 'group':'2'},'tag':'6', 'homeTeam':'Cardiff', 'awayTeam':'MK Dons'},
        {'__v':0,'index':13,'pitch':'7','competition':{'name':'U8', 'section':'Groups', 'group':'3'},'tag':'1', 'homeTeam':'Ipswich', 'awayTeam':'Preston North End'},
        {'__v':0,'index':14,'pitch':'7','competition':{'name':'U8', 'section':'Groups', 'group':'3'},'tag':'2', 'homeTeam':'Hull City', 'awayTeam':'Reading'},
        {'__v':0,'index':15,'pitch':'7','competition':{'name':'U8', 'section':'Groups', 'group':'3'},'tag':'3', 'homeTeam':'Hull City', 'awayTeam':'Ipswich'},
        {'__v':0,'index':16,'pitch':'7','competition':{'name':'U8', 'section':'Groups', 'group':'3'},'tag':'4', 'homeTeam':'Preston North End', 'awayTeam':'Reading'},
        {'__v':0,'index':17,'pitch':'7','competition':{'name':'U8', 'section':'Groups', 'group':'3'},'tag':'5', 'homeTeam':'Reading', 'awayTeam':'Ipswich'},
        {'__v':0,'index':18,'pitch':'7','competition':{'name':'U8', 'section':'Groups', 'group':'3'},'tag':'6', 'homeTeam':'Preston North End', 'awayTeam':'Hull City'},
        {'__v':0,'index':19,'pitch':'8','competition':{'name':'U8', 'section':'Groups', 'group':'4'},'tag':'1', 'homeTeam':'QPR', 'awayTeam':'Fulham FC'},
        {'__v':0,'index':20,'pitch':'8','competition':{'name':'U8', 'section':'Groups', 'group':'4'},'tag':'2', 'homeTeam':'Birmingham', 'awayTeam':'Leeds'},
        {'__v':0,'index':21,'pitch':'8','competition':{'name':'U8', 'section':'Groups', 'group':'4'},'tag':'3', 'homeTeam':'Birmingham', 'awayTeam':'QPR'},
        {'__v':0,'index':22,'pitch':'8','competition':{'name':'U8', 'section':'Groups', 'group':'4'},'tag':'4', 'homeTeam':'Fulham FC', 'awayTeam':'Leeds'},
        {'__v':0,'index':23,'pitch':'8','competition':{'name':'U8', 'section':'Groups', 'group':'4'},'tag':'5', 'homeTeam':'Leeds', 'awayTeam':'QPR'},
        {'__v':0,'index':24,'pitch':'8','competition':{'name':'U8', 'section':'Groups', 'group':'4'},'tag':'6', 'homeTeam':'Fulham FC', 'awayTeam':'Birmingham'}
    ];

    var newsItemData = [
        {
            created: new Date('2015/5/12 12:26:32'),
            title: 'News1',
            body: 'This is the body of the news.  Please take careful note of it :)'
        },
        {
            created: new Date('2015/4/1 11:17:32'),
            title: 'News2',
            body: 'This is the body of the news.  Please take careful note of it s adfsgfsd fgdsf gs fg :)'
        },
        {
            created: new Date('2015/4/11 10:13:32'),
            title: 'News3',
            body: 'This is the body of the news.  Please take careful note of it :)'
        },
        {
            created: new Date('2015/4/9 17:47:32'),
            title: 'News4',
            body: '...'
        }
    ];
});
