var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

module.exports = function(app) {

    var jwtSecret = process.env.JWT_SECRET_KEY;

    var jwtExpiresAfter = process.env.JWT_EXPIRES_IN_MINUTES || 30;

    /*
     * ensure the JWT token has been received and decoded
     */
    var authn = expressJwt({secret: jwtSecret});

    /*
     * authorisation - expects authentication to have occurred already and that 
     * a JWT has been decoded, adding the payload to the request as req.user
     */
    var authzAdmin = function(req, res, next) {
        console.log('Authz attempt for: ' + JSON.stringify(req.user));
        if (req.user && req.user.admin) {
            next();
        }
        else if (req.user) {
            res.status(403).send('Forbidden');
        }
        else {
            res.status(401).send('Unauthorized');
        }
    };

    app.post('/authenticate', function(req, res, next) {
        // TODO: proper User lookup or replace with OAuth call
        console.log('Authn attempt for: ' + JSON.stringify(req.body));
        if (req.body.username === 'admin') {
            var token = jwt.sign({ user: req.body.username, admin: true }, jwtSecret, {expiresInMinutes: jwtExpiresAfter});
            res.json({token: token});
        }
        else if (req.body.username === 'grunt') {
            var token = jwt.sign({ user: req.body.username, admin: false }, jwtSecret, {expiresInMinutes: jwtExpiresAfter});
            res.json({token: token});
        }
        else {
            res.status(401).send('Unknown username or password');
        }
    });

    // PUT/DELETE/POST requests go through the authzAdmin fn except for POST /api/feedbacks
    app.put('/api/*', [authn, authzAdmin]);
    app.delete('/api/*', [authn, authzAdmin]);
    app.get('/api/feedbacks*', [authn, authzAdmin]);
    app.post(/^(?!(\/api\/feedbacks)).*$/, [authn, authzAdmin]);
};

