var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();
var io = require('socket.io').listen(app.listen(process.env.NODE_PORT||3000, '0.0.0.0'));
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongoUri = process.env.STBGFC_MONGO_URI || 'mongodb://localhost/tournamentApp';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');

// basic config
if (app.get('env') === 'development') {
    console.log('Dev config');
    app.use(logger('dev'));
    app.use(express.static(path.join(__dirname, '../web/app')));
    app.use('/bower_components', express.static(path.join(__dirname, '../web/bower_components')));
}
else if (app.get('env') === 'test') {
    console.log('Test config');
    app.use(express.static(path.join(__dirname, '../web/dist')));
}
else {
    console.log('Production config');
}

// mongoose setup
mongoose.connect(mongoUri, function(err) {
    if(err) {
        console.log('mongo connection error', err);
    } else {
        console.log('mongo connection successful to ' + mongoUri);
    }

    var acl = require('./api/acl')(app, mongoose.connection.db);
    var authCheck = require('./api/authentication')(app, acl.roleCheck);
    var tournamentApi = require('./api/tournament')(app, io, mongoose);
    app.use('/api', [authCheck, acl.middleware, tournamentApi]);


    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function(err, req, res) {
        var e = (app.get('env') === 'development') ? err : {};
        console.log(err);
        res.status(err.status || 500)
            .json({
                message: err.message,
                error: e
            });
    });
});

module.exports = app;

