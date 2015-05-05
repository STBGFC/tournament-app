(function () {
    'use strict';

    var JWT_SESSION_KEY = 'stbgfc.security.jwt';
    var loginModal;

    angular
        .module('stbgfc.security', [
            'angularLocalStorage',,
            'ui.router',
            'http-auth-interceptor',
            'mgcrea.ngStrap.modal'
        ])

        .run(function($rootScope, $http, $window, $modal) {

            var savedJwtToken = $window.sessionStorage.getItem(JWT_SESSION_KEY);
            if (savedJwtToken) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + savedJwtToken;
            }

            loginModal = $modal({
                template: 'views/modal-login.html',
                controller: 'LoginController',
                show: false,
                persist: true
            });

            $rootScope.$on('event:auth-loginRequired', function() {
                loginModal.$promise.then(loginModal.show);
            });
        })

        // ============================================================================================
        // controllers
        // ============================================================================================

        .controller('LoginController', function(LoginService, $scope, $state) {

            $scope.username = '';
            $scope.password = '';

            $scope.loggedInUser = function() {
                return LoginService.loggedInUser();
            };

            $scope.doLogin = function() {
                LoginService.authenticate($scope.username, $scope.password);
                loginModal.hide();
            };

            $scope.closeLogin = function() {
                LoginService.cancel();
                loginModal.hide();
            };

            $scope.logout = function () {
                LoginService.logout();
                $scope.username = '';
                $scope.password = '';
                $state.go('home');
            };
        })


        // ============================================================================================
        // services
        // ============================================================================================

        .factory('LoginService', function($rootScope, $http, $window, authService) {
            var UID_SESSION_KEY = 'stbgfc.security.uid';

            return {
                authenticate: function(username, password) {
                    $http.post('/authenticate', {username: username, password: password})
                        .success(function(data) {
                            $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;
                            $window.sessionStorage.setItem(JWT_SESSION_KEY, data.token);
                            $window.sessionStorage.setItem(UID_SESSION_KEY, username);
                            authService.loginConfirmed('success', function(config){
                                config.headers.Authorization = 'Bearer ' + data.token;
                                return config;
                            });
                        })
                        .error(function(data, status) {
                            this.logout();
                            console.error(data, status);
                        });
                },

                cancel: function() {
                    authService.loginCancelled();
                },

                loggedInUser: function() {
                    return $window.sessionStorage.getItem(UID_SESSION_KEY) || false;
                },

                logout: function() {
                    $http.defaults.headers.common.Authorization = null;
                    delete $window.sessionStorage[JWT_SESSION_KEY];
                    delete $window.sessionStorage[UID_SESSION_KEY];
                    $rootScope.$broadcast('event:auth-loginCleared');
                }
            };
        })
    ;
})();

