/*
 * open a node REPL and then .load this file to set up the
 * ACL and connection to the backend.  Ensure you specify the
 * mongo URI in the environment for the REPL.
 *
 * Once users are created (see /qdr.html) they can be assigned
 * roles inside this REPL with:
 *   acl.addUserRoles('joed', 'editor')
 */

var acl = require('acl');
var mongodb = require('mongodb');
var mongoUri = process.env.STBGFC_MONGO_URI || 'mongodb://localhost/tournamentApp';
var User = require('./server/models/User');

mongodb.connect(mongoUri, function (error, db) {
    var mongoBackend = new acl.mongodbBackend(db, 'acl_');
    acl = new acl(mongoBackend);
});


var resources = ['/results', '/news', '/feedbacks', '/tournaments'];
// pass a users array..
var showPerms = function (user) {
    acl.allowedPermissions(user, resources, function (err, perms) {
        console.log(perms);
    });
};

console.log('Try  "showPerms(user)"  or  "acl.addUserRoles(\'foo@example.com\', \'editor\')"');
