/*
 * ============================================================================================
 * news api
 * ============================================================================================
 */
module.exports = function(app,io) {

    var newsList = [
        {created: new Date('2015/4/4 12:26:32'), title: 'Yet More Newsy Type Stuff', body: 'This is the body of the news.  Please take carful note of it :)'},
        {created: new Date('2015/4/3 11:17:32'), title: 'News Henin Dude', body: 'This is the body of the news.  Please take carful note of it s adfsgfsd fgdsf gs fg :)'},
        {created: new Date('2015/4/3 10:13:32'), title: 'More News', body: 'This is the body of the news.  Please take carful note of it :)'},
        {created: new Date('2015/4/4 17:47:32'), title: 'Stuff\'s Occurin\'', body: 'This is the body of the news.  Please take carful note of it.  This is a rather longer news item too with a bunch of random, generic filler text - probably should have just used Lorum Ipsum to be honest, but I couldn\'t be arsed to google it.'}
    ];

    app.get('/api/news', function (req, res) {
        res.json(newsList);
    });

    app.post('/api/news', function (req, res) {

        var news = req.body;
        news.created = new Date();
        newsList.push(news);

        io.sockets.emit('news', news);
        res.status(201).end();
    });
};
