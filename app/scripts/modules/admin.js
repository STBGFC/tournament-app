'use strict';

angular
    .module('tournament.admin', [
        'ngResource'
    ])

    .controller('AdminCompetitionController', function ($scope) { //}, Competition, $location) {
        $scope.competitions = [
                    {type: 'U8', name: 'Alhpa'},
                    {type: 'U8', name: 'Bravo'},
                    {type: 'U9', name: 'Bravo'},
                    {type: 'U10', name: 'Adam'},
                    {type: 'U10', name: 'Bob'},
                    {type: 'U11', name: 'Amarillo'},
                    {type: 'U11', name: 'Blue'},
                    {type: 'U13', name: 'Apple'},
                    {type: 'U14', name: 'Addict'}
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
