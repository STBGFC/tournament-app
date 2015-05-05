var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

module.exports = function(app) {

    var jwtSecret = process.env.JWT_SECRET_KEY;

    var jwtExpiresAfter = process.env.JWT_EXPIRES_IN_MINUTES || 30;

    /*
     * ensure the JWT token has been received and decoded if available
     */
    var authn = expressJwt({
        secret: jwtSecret,
        credentialsRequired: false
    });

    app.post('/authenticate', function(req, res, next) {
        // TODO: proper User lookup or replace with OAuth call
        console.log('Authn attempt for: ' + JSON.stringify(req.body));
        if (req.body.username !== 'evil') {
            var token = jwt.sign({ userId: req.body.username }, jwtSecret, {expiresInMinutes: jwtExpiresAfter});
            res.json({token: token});
        }
        else {
            res.status(401).send('Unknown username or password');
        }
    });

    return authn;
};

