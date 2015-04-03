'use strict';

describe('Controller: TournamentController', function () {

    var scope;

    beforeEach(angular.mock.module('tournamentApp'));
    beforeEach(angular.mock.module('ui.unique'));

    beforeEach(angular.mock.inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('TournamentController', {$scope: scope});
    }));

    it('should attach the tournament to the scope', function () {
        expect(scope.tournament.name).toBe('Karma Tournament');
        expect(scope.tournament.description).toBe('Welcome to our Karma Tournament');
    });

});

describe('Controller: CompetitionController', function () {

    var scope;

    beforeEach(angular.mock.module('tournamentApp'));
    beforeEach(angular.mock.module('ui.unique'));

    beforeEach(angular.mock.inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('CompetitionController', {$scope: scope});
    }));

    it('should attach a list of competitions to the scope', function () {
        expect(scope.competitions.length).toBe(9);
    });

    it('should attach one competition to the scope', function () {
        expect(scope.competition.section).toBe('A');
        expect(scope.competition.name).toBe('U9');
    });

});

describe('Controller: NewsController', function () {

    var scope;

    beforeEach(angular.mock.module('tournamentApp'));
    beforeEach(angular.mock.module('ui.unique'));

    beforeEach(angular.mock.inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('NewsController', {$scope: scope});
    }));

    it('should attach a list of news items to the scope', function () {
        expect(scope.newsItems.length).toBe(4);
    });

});
