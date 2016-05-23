(function () {
    'use strict';

    var JWT_SESSION_KEY = 'stbgfc.security.jwt';
    var loginModal;

    angular
        .module('stbgfc.security', [
            'angularLocalStorage',
            'angular-jwt',
            'ui.router',
            'http-auth-interceptor',
            'mgcrea.ngStrap.modal'
        ])

        .run(function($rootScope, $http, $window, $modal, $state) {

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

            $rootScope.$on('event:auth-loginCleared', function() {
                $state.go('home');
            });

            $rootScope.$on('event:auth-forbidden', function() {
                $('#fourOhThree').show().fadeOut(3000);
            });
        })

        // ============================================================================================
        // controllers
        // ============================================================================================

        .controller('LoginController', function(LoginService, $scope) {

            $scope.username = '';
            $scope.password = '';

            $scope.loggedInUser = function() {
                return LoginService.loggedInUser();
            };

            $scope.userHasRole = function(role) {
                return LoginService.userHasRole(role);
            };

            $scope.requestLogin = function() {
                loginModal.show();
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
            };
        })


        // ============================================================================================
        // services
        // ============================================================================================

        .factory('LoginService', function($rootScope, $http, $window, authService, jwtHelper) {

            return {
                authenticate: function(username, password) {
                    $http.post('/authenticate', {username: username, password: password})
                        .success(function(data) {
                            $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;
                            $window.sessionStorage.setItem(JWT_SESSION_KEY, data.token);
                            authService.loginConfirmed('success', function(config) {
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
                    var token = $window.sessionStorage.getItem(JWT_SESSION_KEY);
                    if (!token) {
                        return false;
                    }
                    return jwtHelper.decodeToken(token).userId;
                },

                userHasRole: function(role) {
                    var token = JSON.parse($window.sessionStorage.getItem(JWT_SESSION_KEY));
                    if (!token) {
                        return false;
                    }
                    return jwtHelper.decodeToken(token).userRoles.indexOf(role) > -1;
                },

                logout: function() {
                    $http.defaults.headers.common.Authorization = undefined;
                    authService.loginCancelled();
                    delete $window.sessionStorage[JWT_SESSION_KEY];
                    $rootScope.$broadcast('event:auth-loginCleared');
                }
            };
        })
    ;
})();

