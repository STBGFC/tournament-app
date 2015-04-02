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

describe('Controller: CompetitionListController', function () {

    var scope;

    beforeEach(angular.mock.module('tournamentApp'));
    beforeEach(angular.mock.module('ui.unique'));

    beforeEach(angular.mock.inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('CompetitionListController', {$scope: scope});
    }));

    it('should attach a list of competitions to the scope', function () {
        expect(scope.competitions.length).toBe(9);
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
