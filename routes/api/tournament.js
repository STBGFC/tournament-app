/*
 * ============================================================================================
 * tournament api
 * ============================================================================================
 */
module.exports = function(app,io) {

    app.get('/api/tournament', function(req, res, next) {
        res.json(
            {
                name: 'May Tournament',
                description: 'Welcome to the STBGFC May 2015 Tournament',
                current: true,
                club: 'STBGFC',
                siteUrl: 'https://www.stbgfc.co.uk'
            }
        );
    });

    app.get('/api/competition', function(req, res) {
        res.json(
            [
                {name: 'U8', section: 'Alhpa'},
                {name: 'U8', section: 'Bravo'},
                {name: 'U9', section: 'Bravo'},
                {name: 'U10', section: 'Adam'},
                {name: 'U10', section: 'Bob'},
                {name: 'U11', section: 'Amarillo'},
                {name: 'U11', section: 'Blue'},
                {name: 'U13', section: 'Apple'},
                {name: 'U14', section: 'Addict'}
            ]
        );
    });

    app.get('/api/competition/:name/:section', function(req, res) {
        res.json(
            {
                'name': req.params.name,
                'section': req.params.section,
                'groups':[
                    {'table':[
                        {'name':'Highmoor United','played':5,'won':4,'drawn':0,'lost':1,'goalsFor':9,'goalsAgainst':2,'points':12},
                        {'name':'STBGFC Boys','played':5,'won':4,'drawn':0,'lost':1,'goalsFor':8,'goalsAgainst':2,'points':12},
                        {'name':'Hart FC Tigers','played':5,'won':2,'drawn':1,'lost':2,'goalsFor':3,'goalsAgainst':4,'points':7},
                        {'name':'Curley Park Rangers Wolves','played':5,'won':2,'drawn':1,'lost':2,'goalsFor':2,'goalsAgainst':5,'points':7},
                        {'name':'Windlesham','played':5,'won':2,'drawn':0,'lost':3,'goalsFor':5,'goalsAgainst':9,'points':6},
                        {'name':'Petersfield Town Pirates','played':5,'won':0,'drawn':0,'lost':5,'goalsFor':0,'goalsAgainst':5,'points':0}
                    ],
                    'results':[
                        {'tag':'1','homeTeam':'Highmoor United','awayTeam':'Hart FC Tigers','homeGoals':0,'awayGoals':1,'id':'eb6d2d90','name':'U9','section':'A','homeScore':'0','awayScore':'1'},
                        {'tag':'1','homeTeam':'Curley Park Rangers Wolves','awayTeam':'STBGFC Boys','homeGoals':0,'awayGoals':2,'id':'9ed7c279','name':'U9','section':'A','homeScore':'0','awayScore':'2'},
                        {'tag':'2','homeTeam':'Windlesham','awayTeam':'Petersfield Town Pirates','homeGoals':1,'awayGoals':0,'id':'3c2e4264','name':'U9','section':'A','homeScore':'1','awayScore':'0'},
                        {'tag':'3','homeTeam':'Curley Park Rangers Wolves','awayTeam':'Petersfield Town Pirates','homeGoals':1,'awayGoals':0,'id':'598bc653','name':'U9','section':'A','homeScore':'1','awayScore':'0'},
                        {'tag':'2','homeTeam':'STBGFC Boys','awayTeam':'Highmoor United','homeGoals':0,'awayGoals':2,'id':'5b8e52bb','name':'U9','section':'A','homeScore':'0','awayScore':'2'},
                        {'tag':'3','homeTeam':'Hart FC Tigers','awayTeam':'Windlesham','homeGoals':1,'awayGoals':3,'id':'be1a9f97','name':'U9','section':'A','homeScore':'1','awayScore':'3'},
                        {'tag':'4','homeTeam':'Highmoor United','awayTeam':'Petersfield Town Pirates','homeGoals':1,'awayGoals':0,'id':'e70fa811','name':'U9','section':'A','homeScore':'1','awayScore':'0'},
                        {'tag':'4','homeTeam':'Windlesham','awayTeam':'Curley Park Rangers Wolves','homeGoals':0,'awayGoals':1,'id':'3df35782','name':'U9','section':'A','homeScore':'0','awayScore':'1'},
                        {'tag':'5','homeTeam':'Hart FC Tigers','awayTeam':'STBGFC Boys','homeGoals':0,'awayGoals':1,'id':'f49fac76','name':'U9','section':'A','homeScore':'0','awayScore':'1'},
                        {'tag':'5','homeTeam':'Curley Park Rangers Wolves','awayTeam':'Highmoor United','homeGoals':0,'awayGoals':3,'id':'3b3ba26c','name':'U9','section':'A','homeScore':'0','awayScore':'3'},
                        {'tag':'6','homeTeam':'Petersfield Town Pirates','awayTeam':'Hart FC Tigers','homeGoals':0,'awayGoals':1,'id':'abf150f4','name':'U9','section':'A','homeScore':'0','awayScore':'1'},
                        {'tag':'6','homeTeam':'STBGFC Boys','awayTeam':'Windlesham','homeGoals':4,'awayGoals':0,'id':'39c5e7d6','name':'U9','section':'A','homeScore':'4','awayScore':'0'},
                        {'tag':'7','homeTeam':'Hart FC Tigers','awayTeam':'Curley Park Rangers Wolves','homeGoals':0,'awayGoals':0,'id':'79a152c7','name':'U9','section':'A','homeScore':'0','awayScore':'0'},
                        {'tag':'7','homeTeam':'Windlesham','awayTeam':'Highmoor United','homeGoals':1,'awayGoals':3,'id':'153500ad','name':'U9','section':'A','homeScore':'1','awayScore':'3'},
                        {'tag':'8','homeTeam':'Petersfield Town Pirates','awayTeam':'STBGFC Boys','homeGoals':0,'awayGoals':1,'id':'f0eeace8','name':'U9','section':'A','homeScore':'0','awayScore':'1'}
                    ]},
                    {'table':[
                        {'name':'Halliford Colts','played':5,'won':4,'drawn':1,'lost':0,'goalsFor':8,'goalsAgainst':0,'points':13},
                        {'name':'Rushmoor Community Renegades','played':5,'won':2,'drawn':1,'lost':2,'goalsFor':4,'goalsAgainst':3,'points':7},
                        {'name':'North Warnborough Spitfires','played':5,'won':1,'drawn':3,'lost':1,'goalsFor':1,'goalsAgainst':1,'points':6},
                        {'name':'Yateley United Warriors','played':5,'won':1,'drawn':2,'lost':2,'goalsFor':2,'goalsAgainst':5,'points':5},
                        {'name':'Whitegrove FC Leopards','played':5,'won':0,'drawn':4,'lost':1,'goalsFor':0,'goalsAgainst':2,'points':4},
                        {'name':'Finchampstead Chiefs','played':5,'won':1,'drawn':1,'lost':3,'goalsFor':2,'goalsAgainst':6,'points':4}
                    ],
                    'results':[
                        {'tag':'1','homeTeam':'Whitegrove FC Leopards','awayTeam':'Finchampstead Chiefs','homeGoals':0,'awayGoals':0,'id':'0e6a5dca','name':'U9','section':'A','homeScore':'0','awayScore':'0'},
                        {'tag':'1','homeTeam':'Yateley United Warriors','awayTeam':'North Warnborough Spitfires','homeGoals':0,'awayGoals':0,'id':'024036c3','name':'U9','section':'A','homeScore':'0','awayScore':'0'},
                        {'tag':'2','homeTeam':'Rushmoor Community Renegades','awayTeam':'Halliford Colts','homeGoals':0,'awayGoals':2,'id':'336fe9b9','name':'U9','section':'A','homeScore':'0','awayScore':'2'},
                        {'tag':'2','homeTeam':'North Warnborough Spitfires','awayTeam':'Whitegrove FC Leopards','homeGoals':0,'awayGoals':0,'id':'05c66ae1','name':'U9','section':'A','homeScore':'0','awayScore':'0'},
                        {'tag':'3','homeTeam':'Yateley United Warriors','awayTeam':'Halliford Colts','homeGoals':0,'awayGoals':3,'id':'f7146dd5','name':'U9','section':'A','homeScore':'0','awayScore':'3'},
                        {'tag':'3','homeTeam':'Finchampstead Chiefs','awayTeam':'Rushmoor Community Renegades','homeGoals':0,'awayGoals':2,'id':'a943bd43','name':'U9','section':'A','homeScore':'0','awayScore':'2'},
                        {'tag':'4','homeTeam':'Rushmoor Community Renegades','awayTeam':'Yateley United Warriors','homeGoals':0,'awayGoals':1,'id':'15f69bb4','name':'U9','section':'A','homeScore':'0','awayScore':'1'},
                        {'tag':'4','homeTeam':'Whitegrove FC Leopards','awayTeam':'Halliford Colts','homeGoals':0,'awayGoals':0,'id':'6bb4e316','name':'U9','section':'A','homeScore':'0','awayScore':'0'},
                        {'tag':'5','homeTeam':'Finchampstead Chiefs','awayTeam':'North Warnborough Spitfires','homeGoals':0,'awayGoals':1,'id':'11257756','name':'U9','section':'A','homeScore':'0','awayScore':'1'},
                        {'tag':'5','homeTeam':'Yateley United Warriors','awayTeam':'Whitegrove FC Leopards','homeGoals':0,'awayGoals':0,'id':'15727783','name':'U9','section':'A','homeScore':'0','awayScore':'0'},
                        {'tag':'6','homeTeam':'Halliford Colts','awayTeam':'Finchampstead Chiefs','homeGoals':2,'awayGoals':0,'id':'95d7ae99','name':'U9','section':'A','homeScore':'2','awayScore':'0'},
                        {'tag':'6','homeTeam':'North Warnborough Spitfires','awayTeam':'Rushmoor Community Renegades','homeGoals':0,'awayGoals':0,'id':'ac1afe48','name':'U9','section':'A','homeScore':'0','awayScore':'0'},
                        {'tag':'7','homeTeam':'Finchampstead Chiefs','awayTeam':'Yateley United Warriors','homeGoals':2,'awayGoals':1,'id':'76fb7a0a','name':'U9','section':'A','homeScore':'2','awayScore':'1'},
                        {'tag':'7','homeTeam':'Rushmoor Community Renegades','awayTeam':'Whitegrove FC Leopards','homeGoals':2,'awayGoals':0,'id':'3656b7ff','name':'U9','section':'A','homeScore':'2','awayScore':'0'},
                        {'tag':'8','homeTeam':'Halliford Colts','awayTeam':'North Warnborough Spitfires','homeGoals':1,'awayGoals':0,'id':'e171c58a','name':'U9','section':'A','homeScore':'1','awayScore':'0'}
                    ]}
                ],
                'results':[
                    {'tag':'33','homeTeam':'North Warnborough Spitfires','awayTeam':'Petrsfield Town Pirates','homeGoals':1,'awayGoals':0,'id':'6757db72','name':'U9','section':'A','homeScore':'1','awayScore':'0'},
                    {'tag':'32','homeTeam':'Curley Park Rangers Wolves','awayTeam':'Whitegrove FC Leopards','homeGoals':0,'awayGoals':1,'id':'bf3fa717','name':'U9','section':'A','homeScore':'0','awayScore':'1'},
                    {'tag':'34','homeTeam':'Yateley United Warriors','awayTeam':'Windlesham','homeGoals':0,'awayGoals':2,'id':'1cd7c0fd','name':'U9','section':'A','homeScore':'0','awayScore':'2'},
                    {'tag':'31','homeTeam':'Hart FC Tigers','awayTeam':'Finchampstead Chiefs','homeGoals':0,'awayGoals':0,'homePens':3,'awayPens':2,'id':'edb30f73','name':'U9','section':'A','homeScore':'0(3)','awayScore':'0(2)'},
                    {'tag':'36','homeTeam':'STBGFC Boys','awayTeam':'North Warnborough Spitfires','homeGoals':1,'awayGoals':0,'id':'befb5268','name':'U9','section':'A','homeScore':'1','awayScore':'0'},
                    {'tag':'35','homeTeam':'Highmoor United','awayTeam':'Windlesham','homeGoals':3,'awayGoals':0,'id':'6fe5659b','name':'U9','section':'A','homeScore':'3','awayScore':'0'},
                    {'tag':'37','homeTeam':'Halliford Colts','awayTeam':'Whitegrove FC Leopards','homeGoals':0,'awayGoals':1,'id':'0c4eac38','name':'U9','section':'A','homeScore':'0','awayScore':'1'},
                    {'tag':'38','homeTeam':'Rushmoor Community Renegades','awayTeam':'Hart FC Tigers','homeGoals':1,'awayGoals':0,'id':'ff9cc728','name':'U9','section':'A','homeScore':'1','awayScore':'0'},
                    {'tag':'40','homeTeam':'STBGFC Boys','awayTeam':'Whitegrove FC Leopards','homeGoals':2,'awayGoals':0,'id':'dc99a360','name':'U9','section':'A','homeScore':'2','awayScore':'0'},
                    {'tag':'39','homeTeam':'Highmoor','awayTeam':'Rushmoor Community Renegades','homeGoals':1,'awayGoals':0,'id':'629f9032','name':'U9','section':'A','homeScore':'1','awayScore':'0'},
                    {'tag':'Final','homeTeam':'Highmoor United','awayTeam':'STBGFC Boys','homeGoals':0,'awayGoals':0,'homePens':3,'awayPens':2,'id':'6fc3f26a','name':'U9','section':'A','homeScore':'0(3)','awayScore':'0(2)'}
                ]

            }
        );
    });

    app.put('/api/result', function(req, res) {
        res.status(201).end();
    });

    var resultPost = function (req, res) {
        var result = req.body;

        // save result, then..

        io.sockets.emit('result', {result: result, compName: req.params.name, compSection: req.params.section});
        res.status(201).end();
    };

    app.post('/api/result/:name/:section/:group', resultPost);

    app.post('/api/result/:name/:section', resultPost);

};
