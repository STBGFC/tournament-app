/*
 * open a node REPL and then .load this file to set up the
 * ACL and connection to the backend.  Ensure you specify the
 * mongo URI in the environment for the REPL
 */

var acl = require('acl');
var mongodb = require('mongodb'); 
var mongoUri = process.env.STBGFC_MONGO_URI || 'mongodb://localhost/tournamentApp';

mongodb.connect(mongoUri, function(error, db) {
    var mongoBackend = new acl.mongodbBackend(db, 'acl_');
    acl = new acl(mongoBackend);
});


