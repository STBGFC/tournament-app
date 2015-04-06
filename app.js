var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();
var io = require('socket.io').listen(app.listen(3000, '0.0.0.0'));
var bodyParser = require('body-parser');
//var cors = require('cors');
//app.use(cors());

app.use(bodyParser.json());

if (app.get('env') === 'development') {
    console.log('Dev config')
    app.use(logger('dev'));
    app.use(express.static(path.join(__dirname, '/web/app')));
    app.use('/bower_components', express.static(path.join(__dirname, '/web/bower_components')));
}
else {
    console.log('Production / non-dev config');
    app.use(express.static(path.join(__dirname, '/web/dist')));
}

/*
 * include various api modules.  If anyone knows how to do this in a way that
 * I can still use the app.use('/api/tournament', tournament); form, I'd
 * be grateful to know!
 */
require('./routes/api/tournament')(app,io);
require('./routes/api/news')(app,io);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function(err, req, res, next) {
    var e = (app.get('env') === 'development') ? err : {};
    res.status(err.status || 500)
    .send({
        message: err.message,
        error: e
    });
});

module.exports = app;
