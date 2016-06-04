var jwt = require('jsonwebtoken');
var request = require('supertest')('http://localhost:3000');
var assert = require('assert');

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

    var authHeader = function() {
        return (latestBearerToken !== '' ? 'Authorization' : 'Dummy');
    };

    var checkCreate = function(uri, payload, code, done) {
        request.post(uri).set(authHeader(), 'Bearer ' + latestBearerToken).send(payload).expect(code, done);
    };
    var checkRead = function(uri, code, done) {
        request.get(uri).set(authHeader(), 'Bearer ' + latestBearerToken).expect(code, done);
    };
    var checkUpdate = function(uri, payload, code, done) {
        request.put(uri).set(authHeader(), 'Bearer ' + latestBearerToken).send(payload).expect(code, done);
    };
    var checkDelete = function(uri, payload, code, done) {
        request.delete(uri).set(authHeader(), 'Bearer ' + latestBearerToken).expect(code, done);
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

        it('cannot crash the server by sending a null authentication payload', function(done) {
            request
                .post('/authenticate')
                .send()
                .expect(400, done);
        });
    });

    describe('a normal user', function() {

        before(function() {
            latestBearerToken = '';
        });
        
        it('should not see the x-powered-by header', function(done) {
            request
                .get('/foo')
                .expect(function(res) {
                    if ('x-powered-by' in res.header) {
                        throw new Error('x-powered-by is visible');
                    }
                })
                .expect(404, done);
        });

        it('cannot create tournament data', function(done) {
            checkCreate('/api/tournaments', {}, 401, done);
        });

        it('can read tournament data', function(done) {
            checkRead('/api/tournaments', 200, done);
        });

        it('cannot update tournament data', function(done) {
            checkUpdate('/api/tournaments', {}, 401, done);
        });

        it('cannot delete tournament data', function(done) {
            checkDelete('/api/tournaments', {}, 401, done);
        });

        it('cannot create results', function(done) {
            checkCreate('/api/results', newResult, 401, done);
        });

        it('can read results', function(done) {
            checkRead('/api/results', 200, done);
        });

        it('can search for results by competition', function(done) {
            checkRead(
                '/api/results?conditions=%7B%22competition.name%22:%22U11%22,%22competition.section%22:%22A%22%7D',
                200,
                done
            );
        });

        it('cannot update results', function(done) {
            checkUpdate('/api/results', {}, 401, done);
        });

        it('cannot delete results', function(done) {
            checkDelete('/api/results', {}, 401, done);
        });

        it('cannot create news', function(done) {
            checkCreate('/api/news', {}, 401, done);
        });

        it('can read news', function(done) {
            checkRead('/api/news', 200, done);
        });

        it('cannot update news', function(done) {
            checkUpdate('/api/news', {}, 401, done);
        });

        it('cannot delete news', function(done) {
            checkDelete('/api/news', {}, 401, done);
        });

        it('can create feedback', function(done) {
            checkCreate('/api/feedbacks', {email: "user@user.org", body: "test feedback"}, 201, done);
        });

        it('cannot read feedback', function(done) {
            checkRead('/api/feedbacks', 401, done)
        });

        it('cannot update feedback', function(done) {
            checkUpdate('/api/feedbacks', {}, 401, done);
        });

        it('cannot delete feedback', function(done) {
            checkDelete('/api/feedbacks', {}, 401, done);
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
            checkCreate('/api/tournaments', {}, 403, done);
        });

        it('cannot update tournament data', function(done) {
            checkUpdate('/api/tournaments', {}, 403, done);
        });

        it('cannot delete tournament data', function(done) {
            checkDelete('/api/tournaments', {}, 403, done);
        });

        it('cannot create results', function(done) {
            checkCreate('/api/results', newResult, 403, done);
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
            checkDelete('/api/results', {}, 403, done);
        });

        it('cannot create news', function(done) {
            checkCreate('/api/news', {}, 403, done);
        });

        it('cannot update news', function(done) {
            checkUpdate('/api/news', {}, 403, done);
        });

        it('cannot delete news', function(done) {
            checkDelete('/api/news', {}, 403, done);
        });

        it('cannot read feedback', function(done) {
            checkRead('/api/feedbacks', 403, done)
        });

        it('cannot update feedback', function(done) {
            checkUpdate('/api/feedbacks', {}, 403, done);
        });

        it('cannot delete feedback', function(done) {
            checkDelete('/api/feedbacks', {}, 403, done);
        });

        it('cannot confirm league positions', function(done) {
            checkCreate(
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
                .expect(function(res) {
                    assert.equal(res.body.tag, newResult.tag);
                    assert.equal(res.body.pitch, newResult.pitch);
                    assert.equal(res.body.index, newResult.index);
                })
                .expect(201, done)
        });

        it('can confirm league table positions', function(done) {
            var table = {0: "Newcastle", 1: "Arsenal", 2: "Man. Utd.", 3: "Chelsea", 4: "Liverpool"};
            request
                .post('/api/leaguetables/U11/A/2')
                .set('Authorization', 'Bearer ' + latestBearerToken)
                .send(table)
                .expect(200)
                .end(function(err, res) {
                    request
                        .get('/api/results?conditions=%7B%22competition.name%22:%22U11%22,%22competition.section%22:%22A%22%7D')
                        .expect(function(res) { 
                            assert.equal(res.body[21].homeTeam, table['3']);
                            assert.equal(res.body[22].awayTeam, table['2']);
                            assert.equal(res.body[23].homeTeam, table['1']);
                            assert.equal(res.body[25].homeTeam, table['0']);
                        })
                        .expect(200, done);
                });
        });

        it('can read feedback', function(done) {
            checkRead('/api/feedbacks', 200, done);
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
