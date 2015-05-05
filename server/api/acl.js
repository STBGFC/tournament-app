var acl = require('acl');

module.exports = function(app, db) {

    // setup ACL storage and rules
    var mongoBackend = new acl.mongodbBackend(db, 'acl_');
    acl = new acl(mongoBackend);
    acl.allow([
        {
            roles:['admin'], 
            allows:[
                {resources:['/tournaments','/news','/results','/feedbacks'], permissions:'*'},
            ]
        },
        {
            roles:['editor'], 
            allows:[
                {resources:['/results','/news'], permissions:['post']},
                {resources:['/results/*','/news/*'], permissions:['put', 'delete']},
            ]
        },
        {
            roles:['guest'], 
            allows:[
                {resources:['/feedbacks'], permissions:['post']},
                {resources:['/results', '/news', '/tournaments'], permissions:['get']},
            ]
        }
    ],
    function(err) {
        if (err) {
            console.log('Unable to setup permissions and roles..');
            console.log(err);
        }
    });

    acl.addRoleParents('editor', ['guest']);
    
    // can't seem to get the inbuilt middleware() function from the acl 
    // pkg to work at all.  Replicate a lot of it here.
    var aclmw = function(req, res, next) {
        if (!req.user) { 
            req.user = {userId: 'anonymous'}; 
        }
        
        var url = req.url.split('?')[0];
        var resource = url.split('/').slice(0, 2).join('/');
        
        acl.isAllowed(req.user.userId, resource, req.method.toLowerCase(), function(error, result) {
            if (result) {
                next();
            }
            else {
                if (req.user.userId === 'anonymous') {
                    res.status(401).send('Not authorised');
                }
                else {
                    res.status(403).send('Forbidden');
                }
            }
        });
    };
        
    return aclmw;
    
};

