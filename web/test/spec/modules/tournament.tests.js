'use strict';

describe ('Tournament Tests', function() {

    var $httpBackend, createController;
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

    beforeEach(function () {
        module('stbgfc.tournament');
        jasmine.addMatchers(customMatchers);
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('TournamentController', function () {
        var rootScope, scope, Tournament;

        beforeEach(
            inject(function(_Tournament_, _$httpBackend_, $rootScope, $controller) {
                Tournament = _Tournament_;
                $httpBackend = _$httpBackend_;
                scope = $rootScope.$new();
                rootScope = $rootScope;
                createController = function() {
                    return $controller('TournamentController', {$scope: scope, $state: {reload: function() {}}});
                };
            })
        );

        it('should attach the tournament to the scope', function () {
            $httpBackend.expectGET('api/tournaments').respond([tournamentData]);
            createController();
            $httpBackend.flush();
            expect(scope.tournament).toEqualData(tournamentData);
        });

        it('should attach one competition to the scope', function () {
            $httpBackend.expectGET('api/tournaments').respond([tournamentData]);
            createController();
            $httpBackend.flush();
            $httpBackend.expectPUT('api/tournaments/123').respond(201);
            scope.createCompetition({name: 'U11', section: 'All', groups: 2});
            $httpBackend.flush();
            expect(scope.tournament.competitions.length).toBe(6);
            expect(scope.tournament.competitions[5].name).toBe('U11');
        });

        it('should add a new item when received on the socket', function() {
            $httpBackend.expectGET('api/tournaments').respond([tournamentData]);
            createController();
            $httpBackend.flush();
            var newItem = {title: 'Socket News', body: 'Socket News Body', created: new Date('2015/5/19 12:26:32')};
            rootScope.$broadcast('socket:news',newItem);
            expect(scope.announcement).toEqualData(newItem);

            rootScope.$broadcast('socket:news',{title: 'Socket News'});
            expect(scope.announcement).toEqualData(newItem);
        });
    });

    describe('ResultsController', function () {
        var scope, rootScope, Result, stateParams, log;
        var qry = 'api/results?conditions=%7B%22competition.name%22:%22U8%22,%22competition.section%22:%22A%22%7D';
        var addedRes = {
            _id: '0987654321',
            tag: '1',
            homeTeam: 'Millwall', homeGoals: 10,
            awayTeam: 'Wolves', awayGoals: 0,
            competition: {name: 'U8', section: 'A', group: 1}
        };

        beforeEach(
            inject(function(_Result_, _$httpBackend_, $rootScope, $controller, _$log_) {
                Result = _Result_;
                $httpBackend = _$httpBackend_;
                scope = $rootScope.$new();
                scope.tournament = tournamentData;
                stateParams = {name:'U8', section:'A'};
                rootScope = $rootScope;
                log = _$log_;
                createController = function() {
                    return $controller('ResultsController', {$scope: scope, $stateParams: stateParams, Result: Result});
                };
            })
        );

        it('should setup a new result', function () {
            $httpBackend.expectGET(qry).respond(u8GroupResults);
            createController();
            $httpBackend.flush();
            scope.createResult();
            expect(scope.newResult).toBeDefined();
            expect(scope.newResult.index).toBe(1000);
        });

        it('should save a new result in group 1', function() {
            $httpBackend.expectGET(qry).respond(u8GroupResults);
            createController();
            $httpBackend.flush();

            $httpBackend.expectPOST('api/results').respond(201, '');
            scope.newResult = newResultData;
            scope.saveResult(1);
            $httpBackend.flush();

            var gresults = scope.competition.groups[0].results;
            expect(gresults.length).toBe(6);
            expect(gresults[0].homeTeam).toEqual('Sheffield Wednesday');
            expect(scope.newResult).toEqual({});
        });

        it('should populate groups and results for the competition in scope', function() {
            $httpBackend.whenGET(qry).respond(u8GroupResults);
            createController();
            $httpBackend.flush();
            var grps = scope.competition.groups;
            expect(grps.length).toBe(4);
            expect(grps[0].results.length).toBe(6);
            expect(grps[1].results[0].homeTeam).toEqual('Rotherham');
            expect(grps[0].table.length).toBe(4);
            expect(grps[0].table[0].name).toBe('Sheffield Wednesday');
            expect(grps[1].table.length).toBe(4);
            expect(grps[2].table.length).toBe(4);
            expect(grps[3].table.length).toBe(0);
        });

        it('should update the results and tables when a new result is received on the socket', function() {
            $httpBackend.whenGET(qry).respond(u8GroupResults);
            createController();
            $httpBackend.flush();

            var grps = scope.competition.groups;

            expect(grps[0].results.length).toBe(6);
            expect(grps[0].table.length).toBe(4);
            expect(grps[0].table[3].name).toBe('Derby County');

            rootScope.$broadcast('socket:result', addedRes);

            expect(grps[0].results.length).toBe(7);
            expect(grps[0].results[6].homeTeam).toBe('Millwall');
            expect(grps[0].results[6].awayTeam).toBe('Wolves');
            expect(grps[0].table.length).toBe(6);
            expect(grps[0].table[5].name).toBe('Wolves');

            // delete it
            rootScope.$broadcast('socket:remove', addedRes);
            expect(grps[0].results.length).toBe(6);
            expect(grps[0].table.length).toBe(4);
            for (var i = 0; i < grps[0].table.length; i++) {
                expect(grps[0].table[i].name).not.toBe('Millwall');
                expect(grps[0].table[i].name).not.toBe('Wolves');
            }
        });

        it('should log a warning when an invalid result arrives on the socket', function() {
            $httpBackend.whenGET(qry).respond(u8GroupResults);
            createController();
            $httpBackend.flush();

            var grps = scope.competition.groups;

            expect(grps[0].results.length).toBe(6);
            expect(grps[0].table.length).toBe(4);
            expect(grps[0].table[3].name).toBe('Derby County');

            spyOn(log, 'warn');
            rootScope.$broadcast('socket:result', {invalid: 'result'});

            expect(log.warn).toHaveBeenCalledWith('invalid result broadcast message received: {"invalid":"result"}');
            expect(grps[0].results.length).toBe(6);
            expect(grps[0].table.length).toBe(4);
            expect(grps[0].table[3].name).toBe('Derby County');
        });

        it('should calculate the table down to alphanumeric as the differentiator', function() {
            $httpBackend.whenGET(qry).respond(u8GroupResults);
            createController();
            $httpBackend.flush();

            var grps = scope.competition.groups;
            expect(grps[0].table[1].name).toBe('Middlesbrough');
            expect(grps[0].table[2].name).toBe('Brentford');
            expect(grps[0].table[3].name).toBe('Derby County');

            // 2 and 3 separated by GD
            expect(grps[0].table[1].points).toEqual(grps[0].table[2].points);
            expect(grps[0].table[2].points).toEqual(grps[0].table[3].points);
            expect(grps[0].table[1].goalsFor - grps[0].table[1].goalsAgainst).toBe(-1);
            expect(grps[0].table[2].goalsFor - grps[0].table[2].goalsAgainst).toBe(-2);

            // bottom 2 split on name only
            expect(grps[0].table[2].points).toEqual(grps[0].table[3].points);
            expect(grps[0].table[2].homeGoals).toEqual(grps[0].table[3].homeGoals);
            expect(grps[0].table[2].awayGoals).toEqual(grps[0].table[3].awayGoals);

            // group 2 - all draws, goals scored diffs
            expect(grps[1].table[0].points).toEqual(grps[1].table[1].points);
            expect(grps[1].table[1].points).toEqual(grps[1].table[2].points);
            expect(grps[1].table[2].points).toEqual(grps[1].table[3].points);
            expect(grps[1].table[0].goalsFor - grps[1].table[0].goalsAgainst).toBe(0);
            expect(grps[1].table[1].goalsFor - grps[1].table[1].goalsAgainst).toBe(0);
            expect(grps[1].table[2].goalsFor - grps[1].table[2].goalsAgainst).toBe(0);
            expect(grps[1].table[3].goalsFor - grps[1].table[3].goalsAgainst).toBe(0);
            expect(grps[1].table[0].goalsFor).toBeGreaterThan(grps[1].table[1].goalsFor);
            expect(grps[1].table[1].goalsFor).toBeGreaterThan(grps[1].table[2].goalsFor);
            expect(grps[1].table[2].goalsFor).toBeGreaterThan(grps[1].table[3].goalsFor);

            // group 3 - Reading ahead of Ipswich on head2head
            expect(grps[2].table[2].points).toEqual(grps[2].table[3].points);
            expect(grps[2].table[2].goalsFor).toEqual(grps[2].table[3].goalsFor);
            expect(grps[2].table[2].goalsAgainst).toEqual(grps[2].table[3].goalsAgainst);
            expect(grps[2].table[2].name).toBe('Reading');
            expect(grps[2].table[3].name).toBe('Ipswich');
        });

        it('should POST the correct table order to the API when confirming table positions', function() {
            $httpBackend.whenGET(qry).respond(u8GroupResults);
            createController();
            $httpBackend.flush();

            $httpBackend.expectPOST('api/leaguetables/U8/A/1').respond();
            scope.competition.currentGroup = 1;
            scope.confirmTablePositions();
            $httpBackend.flush();

            // TODO: spyOn(Table, '$save'); // and expect correct POST body
        });

        it('should set a variable to use for highlighting a team\'s results', function() {
            $httpBackend.whenGET(qry).respond(u8GroupResults);
            createController();
            $httpBackend.flush();
            scope.highlighted = '';
            scope.highlight('Foo');
            expect(scope.highlighted).toBe('Foo');
            scope.highlight('Bar');
            expect(scope.highlighted).toBe('Bar');
            scope.highlight('Bar');
            expect(scope.highlighted).toBe('');
        });
    });

    describe('ResultEditController', function () {
        var scope, Result, state, stateParams, resource;

        beforeEach(
            inject(function(_Result_, _$httpBackend_, $rootScope, $controller) {
                Result = _Result_;
                $httpBackend = _$httpBackend_;
                scope = $rootScope.$new();
                scope.tournament = tournamentData;
                state = {
                    go: function(a, b) {}
                };
                spyOn(state, 'go').and.callThrough();
                stateParams = {id:'dead012345beef'};

                resource = 'api/results/dead012345beef';
                createController = function() {
                    return $controller('ResultEditController', {
                        $scope: scope,
                        $stateParams: stateParams,
                        $state: state,
                        Result: Result
                    });
                };
            })
        );

        it('should add or subtract goals from teams in a match', function() {
            $httpBackend.expectGET(resource).respond(newResultData);
            createController();
            $httpBackend.flush();
            expect(scope.result).toEqualData(newResultData);

            // add a home goal should also init away score to 0
            scope.addGoal(true, 1);
            expect(scope.result.homeGoals).toBe(1);
            expect(scope.result.awayGoals).toBe(0);

            // subtract an away goal should not alter the score
            scope.addGoal(false, -1);
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
            $httpBackend.expectGET(resource).respond(newResultData);
            createController();
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
            $httpBackend.expectGET(resource).respond(newResultData);
            createController();
            $httpBackend.flush();

            $httpBackend.expectPUT(resource).respond(201, '');
            scope.result._id = 'dead012345beef';
            scope.updateResult(scope.result);
            $httpBackend.flush();
            expect(state.go).toHaveBeenCalledWith('resultsGroup', {name: 'U10', section: 'A', group: 1});
        });

        it('should reset a result', function() {
            $httpBackend.expectGET(resource).respond(u8GroupResults[0]);
            createController();
            $httpBackend.flush();

            $httpBackend.expectDELETE(resource).respond({});
            $httpBackend.expectPOST('api/results').respond(201, '');
            scope.result._id = 'dead012345beef';
            scope.resetResult(scope.result);
            $httpBackend.flush();

            expect(scope.result).toEqualData({
                index: 1,
                pitch: '5',
                competition:{
                    name: 'U8',
                    section: 'A',
                    group: '1'},
                tag:'1',
                homeTeam: 'Sheffield Wednesday',
                awayTeam: 'Brentford'
            });
        });

        it('should delete a result', function() {
            $httpBackend.expectGET(resource).respond(newResultData);
            createController();
            $httpBackend.flush();

            $httpBackend.expectDELETE(resource).respond({});
            scope.result._id = 'dead012345beef';
            scope.deleteResult(scope.result);
            $httpBackend.flush();
            expect(state.go).toHaveBeenCalled();
        });
    });

    describe('NewsListController', function () {
        var rootScope, scope, News;

        beforeEach(
            inject(function(_News_, _$httpBackend_, $rootScope, $controller) {
                News = _News_;
                $httpBackend = _$httpBackend_;
                scope = $rootScope.$new();
                rootScope = $rootScope;
                $controller('NewsListController', {$scope: scope});

                $httpBackend
                    .whenGET('api/news')
                    .respond(newsItemData);
                $httpBackend.flush();
            })
        );

        it('should attach a list of news items to the scope', function () {
            expect(scope.newsItems[0].title).toEqual('News1');
            expect(scope.newsItems[0].body).toEqual('This is the body of the news.  Please take careful note of it :)');
        });
    });



    // ============================================================================================
    // fixtures
    // ============================================================================================

    var tournamentData = {
        _id: '123',
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
        {'__v':0,'index':1,'pitch':'5','competition':{'name':'U8', 'section':'A', 'group':'1'},'tag':'1', 'homeTeam':'Sheffield Wednesday', 'awayTeam':'Brentford', 'homeGoals':2, 'awayGoals':0},
        {'__v':0,'index':2,'pitch':'5','competition':{'name':'U8', 'section':'A', 'group':'1'},'tag':'2', 'homeTeam':'Derby County', 'awayTeam':'Middlesbrough', 'homeGoals': 0, 'awayGoals': 0},
        {'__v':0,'index':3,'pitch':'5','competition':{'name':'U8', 'section':'A', 'group':'1'},'tag':'3', 'homeTeam':'Derby County', 'awayTeam':'Sheffield Wednesday', 'homeGoals': 0, 'awayGoals': 2},
        {'__v':0,'index':4,'pitch':'5','competition':{'name':'U8', 'section':'A', 'group':'1'},'tag':'4', 'homeTeam':'Brentford', 'awayTeam':'Middlesbrough', 'homeGoals': 0, 'awayGoals': 0},
        {'__v':0,'index':5,'pitch':'5','competition':{'name':'U8', 'section':'A', 'group':'1'},'tag':'5', 'homeTeam':'Middlesbrough', 'awayTeam':'Sheffield Wednesday', 'homeGoals': 0, 'awayGoals': 1},
        {'__v':0,'index':6,'pitch':'5','competition':{'name':'U8', 'section':'A', 'group':'1'},'tag':'6', 'homeTeam':'Brentford', 'awayTeam':'Derby County', 'homeGoals': 1, 'awayGoals': 1},

        {'__v':0,'index':7,'pitch':'6','competition':{'name':'U8', 'section':'A', 'group':'2'},'tag':'1', 'homeTeam':'Rotherham', 'awayTeam':'Cardiff', 'homeGoals':2, 'awayGoals':2},
        {'__v':0,'index':8,'pitch':'6','competition':{'name':'U8', 'section':'A', 'group':'2'},'tag':'2', 'homeTeam':'MK Dons', 'awayTeam':'Bristol City', 'homeGoals':1, 'awayGoals':1},
        {'__v':0,'index':9,'pitch':'6','competition':{'name':'U8', 'section':'A', 'group':'2'},'tag':'3', 'homeTeam':'MK Dons', 'awayTeam':'Rotherham', 'homeGoals':2, 'awayGoals':2},
        {'__v':0,'index':10,'pitch':'6','competition':{'name':'U8', 'section':'A', 'group':'2'},'tag':'4', 'homeTeam':'Cardiff', 'awayTeam':'Bristol City', 'homeGoals':2, 'awayGoals':2},
        {'__v':0,'index':11,'pitch':'6','competition':{'name':'U8', 'section':'A', 'group':'2'},'tag':'5', 'homeTeam':'Bristol City', 'awayTeam':'Rotherham', 'homeGoals':1, 'awayGoals':1},
        {'__v':0,'index':12,'pitch':'6','competition':{'name':'U8', 'section':'A', 'group':'2'},'tag':'6', 'homeTeam':'Cardiff', 'awayTeam':'MK Dons', 'homeGoals':4, 'awayGoals':4},

        {'__v':0,'index':13,'pitch':'7','competition':{'name':'U8', 'section':'A', 'group':'3'},'tag':'1', 'homeTeam':'Ipswich', 'awayTeam':'Preston North End', 'homeGoals':2, 'awayGoals':1},
        {'__v':0,'index':14,'pitch':'7','competition':{'name':'U8', 'section':'A', 'group':'3'},'tag':'2', 'homeTeam':'Hull City', 'awayTeam':'Reading', 'homeGoals':2, 'awayGoals':1},
        {'__v':0,'index':15,'pitch':'7','competition':{'name':'U8', 'section':'A', 'group':'3'},'tag':'3', 'homeTeam':'Hull City', 'awayTeam':'Ipswich', 'homeGoals':2, 'awayGoals':0},
        {'__v':0,'index':16,'pitch':'7','competition':{'name':'U8', 'section':'A', 'group':'3'},'tag':'4', 'homeTeam':'Preston North End', 'awayTeam':'Reading', 'homeGoals':2, 'awayGoals':0},
        {'__v':0,'index':17,'pitch':'7','competition':{'name':'U8', 'section':'A', 'group':'3'},'tag':'5', 'homeTeam':'Reading', 'awayTeam':'Ipswich', 'homeGoals':2, 'awayGoals':1},
        {'__v':0,'index':18,'pitch':'7','competition':{'name':'U8', 'section':'A', 'group':'3'},'tag':'6', 'homeTeam':'Preston North End', 'awayTeam':'Hull City', 'homeGoals':1, 'awayGoals':1},

        {'__v':0,'index':19,'pitch':'8','competition':{'name':'U8', 'section':'A', 'group':'4'},'tag':'1', 'homeTeam':'QPR', 'awayTeam':'Fulham FC'},
        {'__v':0,'index':20,'pitch':'8','competition':{'name':'U8', 'section':'A', 'group':'4'},'tag':'2', 'homeTeam':'Birmingham', 'awayTeam':'Leeds'},
        {'__v':0,'index':21,'pitch':'8','competition':{'name':'U8', 'section':'A', 'group':'4'},'tag':'3', 'homeTeam':'Birmingham', 'awayTeam':'QPR'},
        {'__v':0,'index':22,'pitch':'8','competition':{'name':'U8', 'section':'A', 'group':'4'},'tag':'4', 'homeTeam':'Fulham FC', 'awayTeam':'Leeds'},
        {'__v':0,'index':23,'pitch':'8','competition':{'name':'U8', 'section':'A', 'group':'4'},'tag':'5', 'homeTeam':'Leeds', 'awayTeam':'QPR'},
        {'__v':0,'index':24,'pitch':'8','competition':{'name':'U8', 'section':'A', 'group':'4'},'tag':'6', 'homeTeam':'Fulham FC', 'awayTeam':'Birmingham'}
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
