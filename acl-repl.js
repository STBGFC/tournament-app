/*
 * open a node REPL and then .load this file to set up the
 * ACL and connection to the backend.  Ensure you specify the
 * mongo URI in the environment for the REPL
 */

var acl = require('acl');
var mongodb = require('mongodb'); 
var mongoUri = process.env.STBGFC_MONGO_URI || 'mongodb://localhost/tournamentApp';
var User = require('./server/models/User');

mongodb.connect(mongoUri, function(error, db) {
    var mongoBackend = new acl.mongodbBackend(db, 'acl_');
    acl = new acl(mongoBackend);
});


var resources = ['/results','/news','/feedbacks','/tournaments'];
// pass a users array..
var showPerms = function(users, resources) {
    for (var i = 0; i < users.length; i++) {
        acl.allowedPermissions(users[i], resources, function(err,perms) {
            console.log(perms);
        });
    }
};

console.log('Try  showPerms(<users>, resources)');

