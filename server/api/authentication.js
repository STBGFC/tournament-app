var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var User = require('../models/User');

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
        console.log('Authn attempt for: ' + JSON.stringify(req.body.username));

        User.getAuthenticated(req.body.username, req.body.password, function(err, user, reason) {
            if (err) {
                throw err;
            }

            if (user) {
                console.log('  ..success');
                var token = jwt.sign({ userId: req.body.username }, jwtSecret, {expiresInMinutes: jwtExpiresAfter});
                res.json({token: token});
                return;
            }

            // otherwise we can determine why we failed
            var reasons = User.failedLogin;
            switch (reason) {
                case reasons.NOT_FOUND:
                    console.log('  ..user not found');
                    res.status(401).send('Unknown username or password');
                    break;
                case reasons.PASSWORD_INCORRECT:
                    console.log('  ..incorrect password');
                    res.status(401).send('Unknown username or password');
                    break;
                case reasons.MAX_ATTEMPTS:
                    // send email or otherwise notify user that account is
                    // temporarily locked
                    console.log('  ..max attempts exceeded, account locked');
                    break;
            }
        });
    });

    // QDR (quick and dirty registration).  TODO: replace it :)
    app.post('/qdr', function(req, res) {
        console.log(req.params);
        var newUser = new User({username: req.body.username, password: req.body.password});
        newUser.save(function(err) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            else {
                res.sendStatus(200);
            }
        });
    });

    return authn;
};

