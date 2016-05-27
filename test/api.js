var jwt = require('jsonwebtoken');
var request = require('supertest')('http://localhost:3000');

describe('When testing the Tournament API', function() {

    var latestBearerToken;

    var jwtDecoder = function (res) {
        latestBearerToken = res.body.token;
        var decoded = jwt.decode(res.body.token, {complete: true});
        res.body = {userId: decoded.userId, userRoles: decoded.userRoles};
    };

    var authenticator = function(email, pwd, roles, done) {
        request.
            post('/authenticate')
            .send({username: email, password: pwd})
            .expect(jwtDecoder)
            .expect({userId: email, userRoles: roles})
            .expect(200, done);
    };

    var newResult = {
        homeTeam: 'Foo',
        awayTeam: 'Bar',
        competition: {
            name: 'U11',
            section: 'B',
            group: 2
        },
        pitch: '11',
        tag: 'TST',
        index: 50
    };

    /* common authz */
    var cannotCreate = function(uri, payload, code, done) { 
        request.post(uri).set('Authorization', 'Bearer ' + latestBearerToken).send(payload).expect(code, done); 
    };
    var cannotRead = function(uri, code, done) {
        request.get(uri).set('Authorization', 'Bearer ' + latestBearerToken).expect(code, done); 
    };
    var cannotUpdate = function(uri, payload, code, done) { 
        request.put(uri).set('Authorization', 'Bearer ' + latestBearerToken).send(payload).expect(code, done); 
    };
    var cannotDelete = function(uri, payload, code, done) { 
        request.delete(uri).set('Authorization', 'Bearer ' + latestBearerToken).expect(code, done); 
    };

    describe('an unauthorised user', function() {

        before(function() {
            latestBearerToken = '';
        });
        
        it('cannot login with invalid name and password', function(done) {
            request
                .post('/authenticate')
                .send({username: 'Dr.Evil',password:'h4x0r'})
                .expect(401, done);
        });

        it('cannot login with incorrect password', function(done) {
            request
                .post('/authenticate')
                .send({username: 'referee@referee.org',password:'h4x0r'})
                .expect(401, done);
        });
    });

    describe('a normal user', function() {

        before(function() {
            latestBearerToken = '';
        });
        
        it('should not see the x-powered-by header', function(done) {
            request
                .get('/')
                .expect(function(res) {
                    if ('x-powered-by' in res.header) {
                        throw new Error('x-powered-by is visible');
                    }
                })
                .expect(404, done);
        });

        it('cannot create tournament data', function(done) {
            cannotCreate('/api/tournaments', {}, 401, done);
        });

        it('can read tournament data', function(done) {
            request
                .get('/api/tournaments')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('cannot update tournament data', function(done) {
            cannotUpdate('/api/tournaments', {}, 401, done);
        });

        it('cannot delete tournament data', function(done) {
            cannotDelete('/api/tournaments', {}, 401, done);
        });

        it('cannot create results', function(done) {
            cannotCreate('/api/results', newResult, 401, done);
        });

        it('can read results', function(done) {
            request
                .get('/api/results')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('can search for results by competition', function(done) {
            // TODO
            done();
        });

        it('cannot update results', function(done) {
            cannotUpdate('/api/results', {}, 401, done);
        });

        it('cannot delete results', function(done) {
            cannotDelete('/api/results', {}, 401, done);
        });

        it('cannot create news', function(done) {
            cannotCreate('/api/news', {}, 401, done);
        });

        it('can read news', function(done) {
            request
                .get('/api/news')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
            // TODO validate response body
        });

        it('cannot update news', function(done) {
            cannotUpdate('/api/news', {}, 401, done);
        });

        it('cannot delete news', function(done) {
            cannotDelete('/api/news', {}, 401, done);
        });

        it('can create feedback', function(done) {
            request
                .post('/api/feedbacks')
                .send( {email: "user@user.org", body: "test feedback"} )
                .expect(201, done);
        });

        it('cannot read feedback', function(done) {
            cannotRead('/api/feedbacks', 401, done)
        });

        it('cannot update feedback', function(done) {
            cannotUpdate('/api/feedbacks', {}, 401, done);
        });

        it('cannot delete feedback', function(done) {
            cannotDelete('/api/feedbacks', {}, 401, done);
        });
    });
   
    describe('a referee', function() {

        before(function() {
            latestBearerToken = '';
        });
        
        it('can login with valid credentials', function(done) {
            authenticator('referee@referee.org', 'referee', ["referee"], done);
        });

        it('cannot create tournament data', function(done) {
            cannotCreate('/api/tournaments', {}, 403, done);
        });

        it('cannot update tournament data', function(done) {
            cannotUpdate('/api/tournaments', {}, 403, done);
        });

        it('cannot delete tournament data', function(done) {
            cannotDelete('/api/tournaments', {}, 403, done);
        });

        it('cannot create results', function(done) {
            cannotCreate('/api/results', newResult, 403, done);
        });

        it('can update results', function(done) {
            var result = {};
            request
                .get('/api/results?conditions=%7B%22competition.name%22:%22U11%22,%22competition.section%22:%22A%22%7D')
                .end(function(err, res) { 
                    if (err) return done(err);
                    result = res.body[11]; 
                    result.homeGoals = 1;
                    result.awayGoals = 3;

                    request
                        .put('/api/results/' + result.id)
                        .set('Authorization', 'Bearer ' + latestBearerToken)
                        .send(result)
                        .expect(200, done);
                });

        });

        it('cannot delete results', function(done) {
            cannotDelete('/api/results', {}, 403, done);
        });

        it('cannot create news', function(done) {
            cannotCreate('/api/news', {}, 403, done);
        });

        it('cannot update news', function(done) {
            cannotUpdate('/api/news', {}, 403, done);
        });

        it('cannot delete news', function(done) {
            cannotDelete('/api/news', {}, 403, done);
        });

        it('cannot read feedback', function(done) {
            cannotRead('/api/feedbacks', 403, done)
        });

        it('cannot update feedback', function(done) {
            cannotUpdate('/api/feedbacks', {}, 403, done);
        });

        it('cannot delete feedback', function(done) {
            cannotDelete('/api/feedbacks', {}, 403, done);
        });

        it('cannot confirm league positions', function(done) {
            cannotCreate(
                '/api/leaguetables/U11/B/2',
                {0: "Newcastle", 1: "Arsenal", 2: "Man. Utd.", 3: "Chelsea", 4: "Liverpool"},
                403,
                done
            );
        });
    });
   
    describe('an editor', function() {

        before(function() {
            latestBearerToken = '';
        });
        
        it('can login with valid credentials', function(done) {
            authenticator('editor@editor.org', 'editor', ['editor', 'referee'], done);
        });

        it('can create results', function(done) {
            request
                .post('/api/results')
                .set('Authorization', 'Bearer ' + latestBearerToken)
                .send(newResult)
                .expect(201)
                .end(function(err, res) {
                    var added = res.body[res.body.length-1];
                    // assert added === newResult;
                    done();
                });
        });

        it('can confirm league table positions', function(done) {
            request
                .post('/api/leaguetables/U11/B/2')
                .set('Authorization', 'Bearer ' + latestBearerToken)
                .send({0: "Newcastle", 1: "Arsenal", 2: "Man. Utd.", 3: "Chelsea", 4: "Liverpool"})
                .expect(200)
                .end(function(err, res) {
                    // TODO verify the second stage results get populated
                    done();
                });
        });

        it('can read feedback', function(done) {
            request
                .get('/api/feedbacks')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
            // TODO validate response body
        });

        // TODO.. editor functions (announcement)
    });

    describe('an administrator', function() {

        before(function() {
            latestBearerToken = '';
        });
        
        it('can login with valid credentials', function(done) {
            authenticator('admin@admin.org', 'admin', ['admin', 'editor', 'referee'], done);
        });

        // TODO.. admin functions (create comp, delete feedback, create page)
    });

});

