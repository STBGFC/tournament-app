/*
 * ==========================================================================
 * tournament api
 * ==========================================================================
 */
module.exports = function(app,io) {

    // TODO: replace with actual storage :)
    var tournament = {};
    var competitions = [];
    var newsList = [];



    /* -----------------------------------------------------------------------
     * tournament
     * ---------------------------------------------------------------------*/
    app.put('/api/tournament', function(req, res) {
        tournament = req.body;
        res.status(201).end();
    });

    app.get('/api/tournament', function(req, res) {
        res.json(tournament);
    });


    /* -----------------------------------------------------------------------
     * competition
     * ---------------------------------------------------------------------*/
    var withCompetition = function(cname, csection, cb) {
        for (var c in competitions) {
            var competition = competitions[c];
            if (competition.name === cname && competition.section === csection) {
                cb(competition);
                return true;
            }
        }
        return false;
    };

    app.post('/api/competition', function(req, res, next) {
        var done = withCompetition(req.body.name, req.body.section, function() {
            var err = new Error('Duplicate competition');
            err.status = 409;
            next(err);
        });

        if (!done) {
            var comp = req.body;
            comp.groups = [];
            for (var c = 0; c < comp.numGroups; c++) {
                comp.groups.push(
                    {
                        results: [],
                        table: []
                    }
                );
            }
            comp.results = comp.results || [];
            competitions.push(comp);
            res.status(201).end();
        }
    });

    app.get('/api/competition/:name/:section', function(req, res, next) {
        var done = withCompetition(req.params.name, req.params.section, function(comp) {
            res.json(comp);
        });
        done || next();
    });

    app.get('/api/competition', function(req, res) {
        res.json(competitions);
    });


    /* -----------------------------------------------------------------------
     * result
     * ---------------------------------------------------------------------*/
    var resultPost = function (req, res) {
        var result = req.body;
        var cname = req.params.name;
        var csection = req.params.section;
        var group = req.params.group;

        if (result.played) {
            // convenience properties taking into account penalties
            result.homeScore = result.homeGoals + (result.homePens ? '(' + result.homePens + ')' : '');
            result.awayScore = result.awayGoals + (result.awayPens ? '(' + result.awayPens + ')' : '');
            io.sockets.emit('result', {result: result, compName: cname, compSection: csection, group: group});
        }

        withCompetition(cname, csection, function(comp) {
            if (!group) {
                comp.results.push(result);
            }
            else {
                // ensure groups
                while (comp.groups.length < group) {
                    comp.groups.push({results:[],table:{}});
                }
                comp.groups[group-1].results.push(result);
            }
        });

        res.status(201).end();
    };

    var resultDelete = function(req, res) {
        var result = req.body;
        var cname = req.params.name;
        var csection = req.params.section;
        var group = req.params.group;

        // backend delete by id..

        res.status(200).end();

    };

    app.post('/api/result/:name/:section/:group', resultPost);

    app.post('/api/result/:name/:section', resultPost);

    app.delete('/api/result/:name/:section/:group', resultDelete);

    app.delete('/api/result/:name/:section', resultDelete);


    /* -----------------------------------------------------------------------
     * news
     * ---------------------------------------------------------------------*/
    app.get('/api/news', function (req, res) {
        res.json(newsList);
    });

    app.post('/api/news', function (req, res) {
        var news = req.body;
        if (news.title && news.body) {
            news.created = new Date();
            newsList.push(news);
            io.sockets.emit('news', news);
            res.status(201).end();
        }
        else {
            res.status(400).end();
        }
    });

};
