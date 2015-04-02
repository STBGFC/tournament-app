'use strict';

angular
    .module('tournament.admin', [
        'ngResource'
    ])

    .controller('AdminCompetitionController', function ($scope) { //}, Competition, $location) {
        $scope.competitions = [
                    {name: 'U8', section: 'Alhpa'},
                    {name: 'U8', section: 'Bravo'},
                    {name: 'U9', section: 'Bravo'},
                    {name: 'U10', section: 'Adam'},
                    {name: 'U10', section: 'Bob'},
                    {name: 'U11', section: 'Amarillo'},
                    {name: 'U11', section: 'Blue'},
                    {name: 'U13', section: 'Apple'},
                    {name: 'U14', section: 'Addict'}
                ];

        /*
        $scope.createCompetition = function() {
            var c = new Competition($scope.competition);
            c.$save(function(data, headers) {
                // success
                $location.path('competition/' + $scope.competition.name + '/' + $scope.competition.section);

            }, function(httpResponse) {
                // fail
                console.log(httpResponse);
            });
        };
        */

    })

;
