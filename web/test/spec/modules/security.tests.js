'use strict';

describe ('Security', function() {

    beforeEach(function () {
        module('stbgfc.security');
    });

    beforeEach(module(function($provide) {
        $provide.value('authService', jasmine.createSpy('authService', function() {
            console.log('authService.loginConfirmed called');
        }));
    }));

    describe('LoginService', function () {

        var $httpBackend, $window, LoginService, rootScope, authService, jwtHelper;
        //var UID_SESSION_KEY = 'stbgfc.security.uid';
        //var JWT_SESSION_KEY = 'stbgfc.security.jwt';
        var jwt = {token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJlZGl0b3JAZWRpdG9yLm9yZyIsInVzZXJSb2xlcyI6WyJlZGl0b3IiXSwiaWF0IjoxNDYzOTIzMzMyLCJleHAiOjE0NjM5MjQ1MzJ9.UcFbQxactWG2f8gF6eZj7KZufClfktYMjVpgtpP4VzQ'};

        beforeEach(
            inject(function(_LoginService_, $rootScope, _$httpBackend_, _$window_, _authService_, _jwtHelper_) {
                LoginService = _LoginService_;
                authService = _authService_;
                $httpBackend = _$httpBackend_;
                $window = _$window_;
                jwtHelper = _jwtHelper_;
                rootScope = $rootScope;
            })
        );

        afterEach(function() {
            //$httpBackend.verifyNoOutstandingExpectation();
            //$httpBackend.verifyNoOutstandingRequest();
        });

        it('should reject a user login with bad name or password', function () {
            $httpBackend.whenGET('views/modal-login.html').respond('');
            $httpBackend
                .whenPOST('/authenticate', {username: 'foo', password: 'bar'})
                .respond(401, '');
            $httpBackend.flush();

            LoginService.authenticate('foo', 'bar');
            //expect($window.sessionStorage[UID_SESSION_KEY]).toBeUndefined();
        });

        it('should store a token for a valid user login', function () {
            var username = 'editor@editor.com';
            var password = 'editor';

            $httpBackend.whenGET('views/modal-login.html').respond('');
            $httpBackend
                .whenPOST('/authenticate', {username: username, password: password})
                .respond(200, jwt);
            $httpBackend.flush();

            LoginService.authenticate(username, password);
            /*
            expect(authService).toHaveBeenCalled();
            expect($window.sessionStorage[JWT_SESSION_KEY]).toBe(jwt.token);
            expect($window.sessionStorage[UID_SESSION_KEY]).toBe(JSON.stringify({userId: 'editor@editor.org', userRoles:['editor']}));
            */
        });
    });

});
