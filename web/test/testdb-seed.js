/*
 * database seed file to ensure the target db is cleaned out and seeded with
 * the minimum data set that the e2e tests need to run.  Good idea to run
 * this before each e2e execution - and ensure the backend API points to
 * whatever db you ran this against.
 */

var tournament = {__v: 0, club : "STBGFC", competitions : [{name : "U8",section : "All","_id" : ObjectId("55f87c400c7317d2737e815a"), groups : 4 }, { name : "U9",section : "All","_id" : ObjectId("55f87c400c7317d2737e8159"), groups : 4 }, { name : "U10", section : "A","_id" : ObjectId("55f87c400c7317d2737e8158"), groups : 2 }, { name : "U10", section : "B","_id" : ObjectId("55f87c400c7317d2737e8157"), groups : 2 }, { name : "U11", section : "A","_id" : ObjectId("55f87c400c7317d2737e8156"), groups : 2 }, { name : "U11", section : "B","_id" : ObjectId("55f87c400c7317d2737e8155"), groups : 2 }, { name : "U12", section : "A","_id" : ObjectId("55f87c400c7317d2737e8154"), groups : 2 }, { name : "U12", section : "B","_id" : ObjectId("55f87c400c7317d2737e8153"), groups : 2 }, { name : "U13", section : "All","_id" : ObjectId("55f87c400c7317d2737e8152"), groups : 2 }, { name : "U14",section : "All", "_id" : ObjectId("55f87c400c7317d2737e8151"), groups : 2 }, { name : "U15", section : "Groups", "_id" : ObjectId("55f87c400c7317d2737e8150"), groups : 4 }, { name : "U15", section : "Champions League", "_id" : ObjectId("55f87c400c7317d2737e814f"), groups : 2 }, { name : "U15", section : "Europa League","_id" : ObjectId("55f87c400c7317d2737e814e"), groups : 2 }, { name : "U17", section : "Groups", "_id" : ObjectId("55f87c400c7317d2737e814d"), groups : 4 }, { name : "U17", section : "Champions League", "_id" : ObjectId("55f87c400c7317d2737e814c"), groups : 2 }, { name : "U17", section : "Europa League","_id" : ObjectId("55f87c400c7317d2737e814b"), groups : 2 }], description : "Welcome to the Sandhurst Town Boys & Girls FC Summer Tournament.", name : "Sandhurst 2016", siteUrl : "https://www.stbgfc.co.uk" };
var news = [{title:"Test announcement 1", body:"this is a test announcement"}, {title:"Another test announcement", body:"this is another announcement"}];
var feedback = {email:"foo@user.org", body:"Cool tournament app!"};
var users = [
    { "guest" : true, "key" : "anonymous" },
    { username : "referee@referee.org", "password" : "$2a$10$qmCfYo3NvYNucjOfoQCGRO2qu2al5.70L7G5TAp7VCEScX34iA/lG" /*referee*/, loginAttempts: 0 },
    { username : "admin@admin.org", "password" : "$2a$10$i75OpE.org3nSECUyXJhCu4ql7vNaglq6w2NcW0fjlAD1sUF/BRvm" /*admin*/, loginAttempts: 0 },
    { username : "editor@editor.org", "password" : "$2a$10$iZmeN3WbFOTEZoKXOThkluOWIb8/nDnKtwLYDksLRWm8B0xUTRADm" /*editor*/, loginAttempts: 0 }

];
var acl_users = [
    { "guest" : true, key : "anonymous" },
    { "admin" : true, key : "admin%40admin%2Eorg" },
    { "editor" : true, key : "editor%40editor%2Eorg" },
    { "referee" : true, key : "referee%40referee%2Eorg" }
];
var acl_roles = [
    { "anonymous" : true, key : "guest" },
    { "admin%40admin%2Eorg" : true, key : "admin" },
    { "editor%40editor%2Eorg" : true, key : "editor" },
    { key : "referee", "referee%40referee%2Eorg" : true }

];
var results = [
    {__v:0,index:1,pitch:"1",competition:{name:"U11", section:"A", group:"1"},tag:"1", homeTeam:"Arsenal", awayTeam:"Liverpool", homeGoals:2, awayGoals:1},
    {__v:0,index:2,pitch:"1",competition:{name:"U11", section:"A", group:"1"},tag:"2", homeTeam:"Chelsea", awayTeam:"Man. Utd.", homeGoals:0, awayGoals:1},
    {__v:0,index:3,pitch:"1",competition:{name:"U11", section:"A", group:"1"},tag:"3", homeTeam:"Newcastle", awayTeam:"Arsenal", homeGoals:1, awayGoals:1},
    {__v:0,index:4,pitch:"1",competition:{name:"U11", section:"A", group:"1"},tag:"4", homeTeam:"Liverpool", awayTeam:"Chelsea", homeGoals:1, awayGoals:3},
    {__v:0,index:5,pitch:"1",competition:{name:"U11", section:"A", group:"1"},tag:"5", homeTeam:"Man. Utd.", awayTeam:"Newcastle", homeGoals:2, awayGoals:2},
    {__v:0,index:6,pitch:"1",competition:{name:"U11", section:"A", group:"1"},tag:"6", homeTeam:"Arsenal", awayTeam:"Chelsea", homeGoals:0, awayGoals:0},
    {__v:0,index:7,pitch:"1",competition:{name:"U11", section:"A", group:"1"},tag:"7", homeTeam:"Liverpool", awayTeam:"Man. Utd.", homeGoals:2, awayGoals:1},
    {__v:0,index:8,pitch:"1",competition:{name:"U11", section:"A", group:"1"},tag:"8", homeTeam:"Chelsea", awayTeam:"Newcastle", homeGoals:2, awayGoals:3},
    {__v:0,index:9,pitch:"1",competition:{name:"U11", section:"A", group:"1"},tag:"9", homeTeam:"Man. Utd.", awayTeam:"Arsenal", homeGoals:2, awayGoals:2},
    {__v:0,index:10,pitch:"1",competition:{name:"U11", section:"A", group:"1"},tag:"10", homeTeam:"Newcastle", awayTeam:"Liverpool", homeGoals:2, awayGoals:0},
    {__v:0,index:11,pitch:"2",competition:{name:"U11", section:"A", group:"2"},tag:"1", homeTeam:"Man. City", awayTeam:"West Ham", homeGoals:0, awayGoals:2},
    {__v:0,index:12,pitch:"2",competition:{name:"U11", section:"A", group:"2"},tag:"2", homeTeam:"Aston Villa", awayTeam:"Everton", homeGoals:4, awayGoals:1},
    {__v:0,index:13,pitch:"2",competition:{name:"U11", section:"A", group:"2"},tag:"3", homeTeam:"Spurs", awayTeam:"Man. City"},
    {__v:0,index:14,pitch:"2",competition:{name:"U11", section:"A", group:"2"},tag:"4", homeTeam:"West Ham", awayTeam:"Aston Villa"},
    {__v:0,index:15,pitch:"2",competition:{name:"U11", section:"A", group:"2"},tag:"5", homeTeam:"Everton", awayTeam:"Spurs"},
    {__v:0,index:16,pitch:"2",competition:{name:"U11", section:"A", group:"2"},tag:"6", homeTeam:"Man. City", awayTeam:"Aston Villa"},
    {__v:0,index:17,pitch:"2",competition:{name:"U11", section:"A", group:"2"},tag:"7", homeTeam:"West Ham", awayTeam:"Everton"},
    {__v:0,index:18,pitch:"2",competition:{name:"U11", section:"A", group:"2"},tag:"8", homeTeam:"Aston Villa", awayTeam:"Spurs"},
    {__v:0,index:19,pitch:"2",competition:{name:"U11", section:"A", group:"2"},tag:"9", homeTeam:"Everton", awayTeam:"Man. City"},
    {__v:0,index:20,pitch:"2",competition:{name:"U11", section:"A", group:"2"},tag:"10", homeTeam:"Spurs", awayTeam:"West Ham"},
    {__v:0,index:21,pitch:"1",competition:{name:"U11", section:"A"},tag:"PO1", homeTeam:"4th Group 1", awayTeam:"5th Group 2", homeTeamFrom:"U11_A_G1_P4", awayTeamFrom:"U11_A_G2_P5", stage2Tag:"U11_A_PO1"},
    {__v:0,index:22,pitch:"2",competition:{name:"U11", section:"A"},tag:"PO2", homeTeam:"4th Group 2", awayTeam:"5th Group 1", homeTeamFrom:"U11_A_G2_P4", awayTeamFrom:"U11_A_G1_P5", stage2Tag:"U11_A_PO2"},
    {__v:0,index:23,pitch:"1",competition:{name:"U11", section:"A"},tag:"QF1", homeTeam:"2nd Group 1", awayTeam:"3rd Group 2", homeTeamFrom:"U11_A_G1_P2", awayTeamFrom:"U11_A_G2_P3", stage2Tag:"U11_A_QF1"},
    {__v:0,index:24,pitch:"2",competition:{name:"U11", section:"A"},tag:"QF2", homeTeam:"2nd Group 2", awayTeam:"3rd Group 1", homeTeamFrom:"U11_A_G2_P2", awayTeamFrom:"U11_A_G1_P3", stage2Tag:"U11_A_QF2"},
    {__v:0,index:25,pitch:"1",competition:{name:"U11", section:"A"},tag:"QF3", homeTeam:"Winner Group 1", awayTeam:"Winner PO1", homeTeamFrom:"U11_A_G1_P1", awayTeamFrom:"U11_A_PO1", stage2Tag:"U11_A_QF3"},
    {__v:0,index:26,pitch:"2",competition:{name:"U11", section:"A"},tag:"QF4", homeTeam:"Winner Group 2", awayTeam:"Winner PO2", homeTeamFrom:"U11_A_G2_P1", awayTeamFrom:"U11_A_PO2", stage2Tag:"U11_A_QF4"},
    {__v:0,index:27,pitch:"1",competition:{name:"U11", section:"A"},tag:"SF1", homeTeam:"Winner QF1", awayTeam:"Winner QF4", homeTeamFrom:"U11_A_QF1", awayTeamFrom:"U11_A_QF4", stage2Tag:"U11_A_SF1"},
    {__v:0,index:28,pitch:"2",competition:{name:"U11", section:"A"},tag:"SF2", homeTeam:"Winner QF2", awayTeam:"Winner QF3", homeTeamFrom:"U11_A_QF2", awayTeamFrom:"U11_A_QF3", stage2Tag:"U11_A_SF2"},
    {__v:0,index:29,pitch:"1",competition:{name:"U11", section:"A"},tag:"FNL", homeTeam:"Winner SF1", awayTeam:"Winner SF2", homeTeamFrom:"U11_A_SF1", awayTeamFrom:"U11_A_SF2", stage2Tag:"U11_A_FNL"},
    {__v:0,index:1,pitch:"5",competition:{name:"U15", section:"Groups", group:"1"},tag:"1", homeTeam:"Sheffield Wednesday", awayTeam:"Brentford"},
    {__v:0,index:2,pitch:"5",competition:{name:"U15", section:"Groups", group:"1"},tag:"2", homeTeam:"Derby County", awayTeam:"Middlesbrough"},
    {__v:0,index:3,pitch:"5",competition:{name:"U15", section:"Groups", group:"1"},tag:"3", homeTeam:"Derby County", awayTeam:"Sheffield Wednesday"},
    {__v:0,index:4,pitch:"5",competition:{name:"U15", section:"Groups", group:"1"},tag:"4", homeTeam:"Brentford", awayTeam:"Middlesbrough"},
    {__v:0,index:5,pitch:"5",competition:{name:"U15", section:"Groups", group:"1"},tag:"5", homeTeam:"Middlesbrough", awayTeam:"Sheffield Wednesday"},
    {__v:0,index:6,pitch:"5",competition:{name:"U15", section:"Groups", group:"1"},tag:"6", homeTeam:"Brentford", awayTeam:"Derby County"},
    {__v:0,index:7,pitch:"6",competition:{name:"U15", section:"Groups", group:"2"},tag:"1", homeTeam:"Rotherham", awayTeam:"Cardiff"},
    {__v:0,index:8,pitch:"6",competition:{name:"U15", section:"Groups", group:"2"},tag:"2", homeTeam:"MK Dons", awayTeam:"Bristol City"},
    {__v:0,index:9,pitch:"6",competition:{name:"U15", section:"Groups", group:"2"},tag:"3", homeTeam:"MK Dons", awayTeam:"Rotherham"},
    {__v:0,index:10,pitch:"6",competition:{name:"U15", section:"Groups", group:"2"},tag:"4", homeTeam:"Cardiff", awayTeam:"Bristol City"},
    {__v:0,index:11,pitch:"6",competition:{name:"U15", section:"Groups", group:"2"},tag:"5", homeTeam:"Bristol City", awayTeam:"Rotherham"},
    {__v:0,index:12,pitch:"6",competition:{name:"U15", section:"Groups", group:"2"},tag:"6", homeTeam:"Cardiff", awayTeam:"MK Dons"},
    {__v:0,index:13,pitch:"7",competition:{name:"U15", section:"Groups", group:"3"},tag:"1", homeTeam:"Ipswich", awayTeam:"Preston North End"},
    {__v:0,index:14,pitch:"7",competition:{name:"U15", section:"Groups", group:"3"},tag:"2", homeTeam:"Hull City", awayTeam:"Reading"},
    {__v:0,index:15,pitch:"7",competition:{name:"U15", section:"Groups", group:"3"},tag:"3", homeTeam:"Hull City", awayTeam:"Ipswich"},
    {__v:0,index:16,pitch:"7",competition:{name:"U15", section:"Groups", group:"3"},tag:"4", homeTeam:"Preston North End", awayTeam:"Reading"},
    {__v:0,index:17,pitch:"7",competition:{name:"U15", section:"Groups", group:"3"},tag:"5", homeTeam:"Reading", awayTeam:"Ipswich"},
    {__v:0,index:18,pitch:"7",competition:{name:"U15", section:"Groups", group:"3"},tag:"6", homeTeam:"Preston North End", awayTeam:"Hull City"},
    {__v:0,index:19,pitch:"8",competition:{name:"U15", section:"Groups", group:"4"},tag:"1", homeTeam:"QPR", awayTeam:"Fulham FC"},
    {__v:0,index:20,pitch:"8",competition:{name:"U15", section:"Groups", group:"4"},tag:"2", homeTeam:"Birmingham", awayTeam:"Leeds"},
    {__v:0,index:21,pitch:"8",competition:{name:"U15", section:"Groups", group:"4"},tag:"3", homeTeam:"Birmingham", awayTeam:"QPR"},
    {__v:0,index:22,pitch:"8",competition:{name:"U15", section:"Groups", group:"4"},tag:"4", homeTeam:"Fulham FC", awayTeam:"Leeds"},
    {__v:0,index:23,pitch:"8",competition:{name:"U15", section:"Groups", group:"4"},tag:"5", homeTeam:"Leeds", awayTeam:"QPR"},
    {__v:0,index:24,pitch:"8",competition:{name:"U15", section:"Groups", group:"4"},tag:"6", homeTeam:"Fulham FC", awayTeam:"Birmingham"},
    {__v:0,index:25,pitch:"5",competition:{name:"U15", section:"Champions League", group:"1"},tag:"1", homeTeam:"Winner Group 1", awayTeam:"Winner Group 3", homeTeamFrom:"U15_Groups_G1_P1", awayTeamFrom:"U15_Groups_G3_P1"},
    {__v:0,index:26,pitch:"5",competition:{name:"U15", section:"Champions League", group:"1"},tag:"2", homeTeam:"2nd Group 2", awayTeam:"2nd Group 4", homeTeamFrom:"U15_Groups_G2_P2", awayTeamFrom:"U15_Groups_G4_P2"},
    {__v:0,index:27,pitch:"5",competition:{name:"U15", section:"Champions League", group:"1"},tag:"3", homeTeam:"2nd Group 2", awayTeam:"Winner Group 1", homeTeamFrom:"U15_Groups_G2_P2", awayTeamFrom:"U15_Groups_G1_P1"},
    {__v:0,index:28,pitch:"5",competition:{name:"U15", section:"Champions League", group:"1"},tag:"4", homeTeam:"Winner Group 3", awayTeam:"2nd Group 4", homeTeamFrom:"U15_Groups_G3_P1", awayTeamFrom:"U15_Groups_G4_P2"},
    {__v:0,index:29,pitch:"5",competition:{name:"U15", section:"Champions League", group:"1"},tag:"5", homeTeam:"2nd Group 4", awayTeam:"Winner Group 1", homeTeamFrom:"U15_Groups_G4_P2", awayTeamFrom:"U15_Groups_G1_P1"},
    {__v:0,index:30,pitch:"5",competition:{name:"U15", section:"Champions League", group:"1"},tag:"6", homeTeam:"Winner Group 3", awayTeam:"2nd Group 2", homeTeamFrom:"U15_Groups_G3_P1", awayTeamFrom:"U15_Groups_G2_P2"},
    {__v:0,index:31,pitch:"6",competition:{name:"U15", section:"Champions League", group:"2"},tag:"1", homeTeam:"Winner Group 2", awayTeam:"Winner Group 4", homeTeamFrom:"U15_Groups_G2_P1", awayTeamFrom:"U15_Groups_G4_P1"},
    {__v:0,index:32,pitch:"6",competition:{name:"U15", section:"Champions League", group:"2"},tag:"2", homeTeam:"2nd Group 3", awayTeam:"2nd Group 1", homeTeamFrom:"U15_Groups_G3_P2", awayTeamFrom:"U15_Groups_G1_P2"},
    {__v:0,index:33,pitch:"6",competition:{name:"U15", section:"Champions League", group:"2"},tag:"3", homeTeam:"2nd Group 3", awayTeam:"Winner Group 2", homeTeamFrom:"U15_Groups_G3_P2", awayTeamFrom:"U15_Groups_G2_P1"},
    {__v:0,index:34,pitch:"6",competition:{name:"U15", section:"Champions League", group:"2"},tag:"4", homeTeam:"Winner Group 4", awayTeam:"2nd Group 1", homeTeamFrom:"U15_Groups_G4_P1", awayTeamFrom:"U15_Groups_G1_P2"},
    {__v:0,index:35,pitch:"6",competition:{name:"U15", section:"Champions League", group:"2"},tag:"5", homeTeam:"2nd Group 1", awayTeam:"Winner Group 2", homeTeamFrom:"U15_Groups_G1_P2", awayTeamFrom:"U15_Groups_G2_P1"},
    {__v:0,index:36,pitch:"6",competition:{name:"U15", section:"Champions League", group:"2"},tag:"6", homeTeam:"Winner Group 4", awayTeam:"2nd Group 3", homeTeamFrom:"U15_Groups_G4_P1", awayTeamFrom:"U15_Groups_G3_P2"},
    {__v:0,index:37,pitch:"7",competition:{name:"U15", section:"Europa League", group:"1"},tag:"1", homeTeam:"3rd Group 1", awayTeam:"3rd Group 3", homeTeamFrom:"U15_Groups_G1_P3", awayTeamFrom:"U15_Groups_G3_P3"},
    {__v:0,index:38,pitch:"7",competition:{name:"U15", section:"Europa League", group:"1"},tag:"2", homeTeam:"4th Group 2", awayTeam:"4th Group 4", homeTeamFrom:"U15_Groups_G2_P4", awayTeamFrom:"U15_Groups_G4_P4"},
    {__v:0,index:39,pitch:"7",competition:{name:"U15", section:"Europa League", group:"1"},tag:"3", homeTeam:"4th Group 2", awayTeam:"3rd Group 1", homeTeamFrom:"U15_Groups_G2_P4", awayTeamFrom:"U15_Groups_G1_P3"},
    {__v:0,index:40,pitch:"7",competition:{name:"U15", section:"Europa League", group:"1"},tag:"4", homeTeam:"3rd Group 3", awayTeam:"4th Group 4", homeTeamFrom:"U15_Groups_G3_P3", awayTeamFrom:"U15_Groups_G4_P4"},
    {__v:0,index:41,pitch:"7",competition:{name:"U15", section:"Europa League", group:"1"},tag:"5", homeTeam:"4th Group 4", awayTeam:"3rd Group 1", homeTeamFrom:"U15_Groups_G4_P4", awayTeamFrom:"U15_Groups_G1_P3"},
    {__v:0,index:42,pitch:"7",competition:{name:"U15", section:"Europa League", group:"1"},tag:"6", homeTeam:"3rd Group 3", awayTeam:"4th Group 2", homeTeamFrom:"U15_Groups_G3_P3", awayTeamFrom:"U15_Groups_G2_P4"},
    {__v:0,index:43,pitch:"8",competition:{name:"U15", section:"Europa League", group:"2"},tag:"1", homeTeam:"3rd Group 2", awayTeam:"3rd Group 4", homeTeamFrom:"U15_Groups_G2_P3", awayTeamFrom:"U15_Groups_G4_P3"},
    {__v:0,index:44,pitch:"8",competition:{name:"U15", section:"Europa League", group:"2"},tag:"2", homeTeam:"4th Group 3", awayTeam:"4th Group 1", homeTeamFrom:"U15_Groups_G3_P4", awayTeamFrom:"U15_Groups_G1_P4"},
    {__v:0,index:45,pitch:"8",competition:{name:"U15", section:"Europa League", group:"2"},tag:"3", homeTeam:"4th Group 3", awayTeam:"3rd Group 2", homeTeamFrom:"U15_Groups_G3_P4", awayTeamFrom:"U15_Groups_G2_P3"},
    {__v:0,index:46,pitch:"8",competition:{name:"U15", section:"Europa League", group:"2"},tag:"4", homeTeam:"3rd Group 4", awayTeam:"4th Group 1", homeTeamFrom:"U15_Groups_G4_P3", awayTeamFrom:"U15_Groups_G1_P4"},
    {__v:0,index:47,pitch:"8",competition:{name:"U15", section:"Europa League", group:"2"},tag:"5", homeTeam:"4th Group 1", awayTeam:"3rd Group 2", homeTeamFrom:"U15_Groups_G1_P4", awayTeamFrom:"U15_Groups_G2_P3"},
    {__v:0,index:48,pitch:"8",competition:{name:"U15", section:"Europa League", group:"2"},tag:"6", homeTeam:"3rd Group 4", awayTeam:"4th Group 3", homeTeamFrom:"U15_Groups_G4_P3", awayTeamFrom:"U15_Groups_G3_P4"},
    {__v:0,index:49,pitch:"5",competition:{name:"U15", section:"Champions League"},tag:"SF1", homeTeam:"Winner Group 1", awayTeam:"2nd Group 2", homeTeamFrom:"U15_ChampionsLeague_G1_P1", awayTeamFrom:"U15_ChampionsLeague_G2_P2", stage2Tag:"U15_ChampionsLeague_SF1"},
    {__v:0,index:50,pitch:"6",competition:{name:"U15", section:"Champions League"},tag:"SF2", homeTeam:"Winner Group 2", awayTeam:"2nd Group 1", homeTeamFrom:"U15_ChampionsLeague_G2_P1", awayTeamFrom:"U15_ChampionsLeague_G1_P2", stage2Tag:"U15_ChampionsLeague_SF2"},
    {__v:0,index:51,pitch:"5",competition:{name:"U15", section:"Champions League"},tag:"FIN", homeTeam:"Winner SF1", awayTeam:"Winner SF2", homeTeamFrom:"U15_ChampionsLeague_SF1", awayTeamFrom:"U15_ChampionsLeague_SF2", stage2Tag:"U15_ChampionsLeague_FNL"},
    {__v:0,index:52,pitch:"7",competition:{name:"U15", section:"Europa League"},tag:"SF1", homeTeam:"Winner Group 1", awayTeam:"2nd Group 2", homeTeamFrom:"U15_EuropaLeague_G1_P1", awayTeamFrom:"U15_EuropaLeague_G2_P2", stage2Tag:"U15_EuropaLeague_SF1"},
    {__v:0,index:53,pitch:"8",competition:{name:"U15", section:"Europa League"},tag:"SF2", homeTeam:"Winner Group 2", awayTeam:"2nd Group 1", homeTeamFrom:"U15_EuropaLeague_G2_P1", awayTeamFrom:"U15_EuropaLeague_G1_P2", stage2Tag:"U15_EuropaLeague_SF2"},
    {__v:0,index:54,pitch:"7",competition:{name:"U15", section:"Europa League"},tag:"FIN", homeTeam:"Winner SF1", awayTeam:"Winner SF2", homeTeamFrom:"U15_EuropaLeague_SF1", awayTeamFrom:"U15_EuropaLeague_SF2", stage2Tag:"U15_EuropaLeague_FNL"}
];

// --------------------------------------------------------------------------

db.tournaments.remove({});
db.results.remove({});
db.news.remove({});
db.users.remove({});
db.acl_users.remove({});
db.acl_roles.remove({});
db.pages.remove({});
db.feedback.remove({});

db.tournaments.insert(tournament);
db.results.insert(results);
db.news.insert(news);
db.users.insert(users);
db.acl_roles.insert(acl_roles);
db.acl_users.insert(acl_users);
db.feedback.insert(feedback);
