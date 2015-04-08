/*
 * ============================================================================================
 * news api
 * ============================================================================================
 */
module.exports = function(app,io) {

    var newsList = [];

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
