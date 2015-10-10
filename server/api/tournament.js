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
module.exports = function(app, io, mongoose) {

    Tournament.locking(true);
    Result.locking(true);

    baucis.rest(Tournament).methods('delete', false);
    baucis.rest(Result);
    baucis.rest(News);
    baucis.rest(Page);
    baucis.rest(Feedback);

    var updateStageTwo = function(source, target) {
        var cb = function(err, count) {
            Result.find(
                {$or:[{homeTeamFrom: source}, {awayTeamFrom: source}]},
                function(err, docs) {
                    for (var i = 0; i < docs.length; i++) {
                        io.sockets.emit('result', docs[i]);
                        console.log('Emiting updated stage2 result ' + JSON.stringify(docs[i]));
                    }
                }
            );
        };
        console.log('Updating ' + source + ' to ' + target);
        Result.update({homeTeamFrom: source}, {$set: {homeTeam: target}}, {multi: true}, cb);
        Result.update({awayTeamFrom: source}, {$set: {awayTeam: target}}, {multi: true}, cb);
    };

    // mongoose middleware hook to emit the broadcast event after a successful save
    mongoose.model('News').schema.post('save', function(newsItem) {
        io.sockets.emit('news', newsItem);
    });

    mongoose.model('Result').schema.post('save', function(result) {
        io.sockets.emit('result', result);

        // search and replace stage2 tag
        if ('stage2Tag' in result && result.stage2Tag !== undefined) {
            console.log('Searching for stage 2 target ' + result.stage2Tag);
            var winner = result.homeTeam;
            if (result.awayPens > result.homePens || result.awayGoals > result.homeGoals) {
                winner = result.awayTeam;
            }
            updateStageTwo(result.stage2Tag, winner);
        }

    });

    mongoose.model('Result').schema.post('remove', function(result) {
        io.sockets.emit('remove', result);
    });

    /*
     * post a league table so that 2nd stage games can be worked out.  Body should contain
     * an array of team names in the order they finished in the table; i.e.
     *
     * req.body == ["Sheff. Wed.", "Ipswich", "Cardiff", "Leeds", "Rotherham"]
     */
    app.post('/api/leaguetables/:competition/:section/:group', function(req, res) {
        var prefix = req.params.competition + '_' + req.params.section + '_G' + req.params.group + '_P';
        console.log('Resolving stage 2 placeholders for ' + prefix + ' and team names ' + JSON.stringify(req.body));

        for (var k in req.body) {
            if (req.body.hasOwnProperty(k) && !isNaN(k)) {
                var source = prefix + (parseInt(k) + 1);
                updateStageTwo(source, req.body[k]);
            }
        }

        res.sendStatus(200);

    });

    return baucis();
};
