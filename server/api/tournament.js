var baucis = require('baucis');

var Tournament = require('../models/Tournament.js');
var Result = require('../models/Result.js');
var News = require('../models/News.js');
var Page = require('../models/Page.js');
var Feedback = require('../models/Feedback.js');


/*
 * ==========================================================================
 * tournament api
 * ==========================================================================
 */
module.exports = function(io, mongoose) {

    Tournament.locking(true);
    Result.locking(true);

    baucis.rest(Tournament).methods('delete', false);
    baucis.rest(Result);
    baucis.rest(News);
    baucis.rest(Page);
    baucis.rest(Feedback);

    // mongoose middleware hook to emit the broadcast event after a successful save
    mongoose.model('News').schema.post('save', function(newsItem) {
        io.sockets.emit('news', newsItem);
    });

    mongoose.model('Result').schema.post('save', function(result) {
        io.sockets.emit('result', result);
    });

    mongoose.model('Result').schema.post('remove', function(result) {
        io.sockets.emit('remove', result);
    });

    return baucis();
};
