var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var User = require('../models/User');
var logger = require('log4js').getLogger('app');

module.exports = function(app, roleCheck) {

    var jwtSecret = process.env.JWT_SECRET_KEY;

    var jwtExpiresAfter = (process.env.JWT_EXPIRES_IN_MINUTES || 30) * 60;

    /*
     * ensure the JWT token has been received and decoded if available
     */
    var authn = expressJwt({
        secret: jwtSecret,
        credentialsRequired: false
    });

    app.post('/authenticate', function(req, res, next) {
        logger.debug('Authn attempt for: ' + JSON.stringify(req.body.username));

        User.getAuthenticated(req.body.username, req.body.password, function(err, user, reason) {
            if (err) {
                res.status(400).send('Unknown username or password');
            }

            else if (user) {
                roleCheck(user.username, function(err, roles) {
                    if (err) {
                        logger.error(err);
                        roles = '';
                    }

                    logger.debug('  ..success.  User has roles: ' + roles);

                    var token = jwt.sign({ userId: user.username, userRoles: roles }, jwtSecret, {expiresIn: jwtExpiresAfter});
                    res.json({token: token});
                });
            }
            else {
                // otherwise we can determine why we failed
                var reasons = User.failedLogin;
                switch (reason) {
                    case reasons.NOT_FOUND:
                        logger.debug('  ..user not found');
                        res.status(401).send('Unknown username or password');
                        break;
                    case reasons.PASSWORD_INCORRECT:
                        logger.debug('  ..incorrect password');
                        res.status(401).send('Unknown username or password');
                        break;
                    case reasons.MAX_ATTEMPTS:
                        // send email or otherwise notify user that account is
                        // temporarily locked
                        logger.debug('  ..max attempts exceeded, account locked');
                        break;
                }
            }
        });
    });

    // QDR (quick and dirty registration).  TODO: replace it :)
    app.post('/qdr', function(req, res) {
        var newUser = new User({username: req.body.username, password: req.body.password});
        newUser.save(function(err) {
            if (err) {
                logger.error(err);
                res.sendStatus(500);
            }
            else {
                res.sendStatus(200);
            }
        });
    });

    return authn;
};

