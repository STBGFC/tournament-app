var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();
var io = require('socket.io').listen(app.listen(process.env.NODE_PORT||3000, '0.0.0.0'));
var bodyParser = require('body-parser');

app.use(bodyParser.json());

// basic config
if (app.get('env') === 'development') {
    console.log('Dev config');
    app.use(logger('dev'));
    app.use(express.static(path.join(__dirname, '../web/app')));
    app.use('/bower_components', express.static(path.join(__dirname, '../web/bower_components')));
}
else {
    console.log('Production config');
    app.use(express.static(path.join(__dirname, '../web/dist')));
}


// security
require('./api/security')(app);

// routes/API
require('./api/tournament')(app,io);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res) {
    var e = (app.get('env') === 'development') ? err : {};
    res.status(err.status || 500)
        .json({
            message: err.message,
            error: e
        });
});

module.exports = app;

