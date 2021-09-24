import { readable, writable } from 'svelte/store';

let _tournament = {
    club : "STBGFC", 
    competitions : [
        { name : "U11", section : "A", groups : 2 }, 
        { name : "U11", section : "B", groups : 2 }, 
        { name : "U12", section : "A", groups : 2 }, 
        { name : "U15", section : "Groups", groups : 4 }, 
        { name : "U15", section : "Champions League", groups : 2 }, 
        { name : "U15", section : "Europa League",groups : 2 }
    ], 
    description : "Welcome to the STBGFC TESTING Tournament.", 
    name : "Sandhurst TEST", 
    siteUrl : "https://www.example.com" 
};

let _results = [
    {__v:0,day:1,dateTime:30600000,duration:"8m",pitch:"1",competition:{name:"U11", section:"A", group:"1"},tag:"1", homeTeam:"Arsenal", awayTeam:"Liverpool", homeGoals:2, awayGoals:1},
    {__v:0,day:1,dateTime:31500000,duration:"8m",pitch:"1",competition:{name:"U11", section:"A", group:"1"},tag:"2", homeTeam:"Chelsea", awayTeam:"Man. Utd.", homeGoals:0, awayGoals:1},
    {__v:0,day:1,dateTime:32400000,duration:"8m",pitch:"1",competition:{name:"U11", section:"A", group:"1"},tag:"3", homeTeam:"Newcastle", awayTeam:"Arsenal", homeGoals:1, awayGoals:1},
    {__v:0,day:1,dateTime:33300000,duration:"8m",pitch:"1",competition:{name:"U11", section:"A", group:"1"},tag:"4", homeTeam:"Liverpool", awayTeam:"Chelsea", homeGoals:1, awayGoals:3},
    {__v:0,day:1,dateTime:34200000,duration:"8m",pitch:"1",competition:{name:"U11", section:"A", group:"1"},tag:"5", homeTeam:"Man. Utd.", awayTeam:"Newcastle", homeGoals:2, awayGoals:2},
    {__v:0,day:1,dateTime:35100000,duration:"8m",pitch:"1",competition:{name:"U11", section:"A", group:"1"},tag:"6", homeTeam:"Arsenal", awayTeam:"Chelsea", homeGoals:0, awayGoals:0},
    {__v:0,day:1,dateTime:36000000,duration:"8m",pitch:"1",competition:{name:"U11", section:"A", group:"1"},tag:"7", homeTeam:"Liverpool", awayTeam:"Man. Utd.", homeGoals:2, awayGoals:1},
    {__v:0,day:1,dateTime:36900000,duration:"8m",pitch:"1",competition:{name:"U11", section:"A", group:"1"},tag:"8", homeTeam:"Chelsea", awayTeam:"Newcastle", homeGoals:2, awayGoals:3},
    {__v:0,day:1,dateTime:37800000,duration:"8m",pitch:"1",competition:{name:"U11", section:"A", group:"1"},tag:"9", homeTeam:"Man. Utd.", awayTeam:"Arsenal", homeGoals:2, awayGoals:2},
    {__v:0,day:1,dateTime:38700000,duration:"8m",pitch:"1",competition:{name:"U11", section:"A", group:"1"},tag:"10", homeTeam:"Newcastle", awayTeam:"Liverpool", homeGoals:2, awayGoals:0},
    {__v:0,day:1,dateTime:30600000,duration:"8m",pitch:"2",competition:{name:"U11", section:"A", group:"2"},tag:"1", homeTeam:"Man. City", awayTeam:"West Ham", homeGoals:0, awayGoals:2},
    {__v:0,day:1,dateTime:31500000,duration:"8m",pitch:"2",competition:{name:"U11", section:"A", group:"2"},tag:"2", homeTeam:"Aston Villa", awayTeam:"Everton", homeGoals:4, awayGoals:1},
    {__v:0,day:1,dateTime:32400000,duration:"8m",pitch:"2",competition:{name:"U11", section:"A", group:"2"},tag:"3", homeTeam:"Spurs", awayTeam:"Man. City"},
    {__v:0,day:1,dateTime:33300000,duration:"8m",pitch:"2",competition:{name:"U11", section:"A", group:"2"},tag:"4", homeTeam:"West Ham", awayTeam:"Aston Villa", homeGoals:4, awayGoals:1},
    {__v:0,day:1,dateTime:34200000,duration:"8m",pitch:"2",competition:{name:"U11", section:"A", group:"2"},tag:"5", homeTeam:"Everton", awayTeam:"Spurs"},
    {__v:0,day:1,dateTime:35100000,duration:"8m",pitch:"2",competition:{name:"U11", section:"A", group:"2"},tag:"6", homeTeam:"Man. City", awayTeam:"Aston Villa"},
    {__v:0,day:1,dateTime:36000000,duration:"8m",pitch:"2",competition:{name:"U11", section:"A", group:"2"},tag:"7", homeTeam:"West Ham", awayTeam:"Everton"},
    {__v:0,day:1,dateTime:36900000,duration:"8m",pitch:"2",competition:{name:"U11", section:"A", group:"2"},tag:"8", homeTeam:"Aston Villa", awayTeam:"Spurs"},
    {__v:0,day:1,dateTime:37800000,duration:"8m",pitch:"2",competition:{name:"U11", section:"A", group:"2"},tag:"9", homeTeam:"Everton", awayTeam:"Man. City"},
    {__v:0,day:1,dateTime:38700000,duration:"8m",pitch:"2",competition:{name:"U11", section:"A", group:"2"},tag:"10", homeTeam:"Spurs", awayTeam:"West Ham"},
    {__v:0,day:1,dateTime:40500000,duration:"8m",pitch:"1",competition:{name:"U11", section:"A"},tag:"PO1", homeTeam:"4th Group 1", awayTeam:"5th Group 2", homeTeamFrom:"U11_A_G1_P4", awayTeamFrom:"U11_A_G2_P5", stage2Tag:"U11_A_PO1"},
    {__v:0,day:1,dateTime:41400000,duration:"8m",pitch:"2",competition:{name:"U11", section:"A"},tag:"PO2", homeTeam:"4th Group 2", awayTeam:"5th Group 1", homeTeamFrom:"U11_A_G2_P4", awayTeamFrom:"U11_A_G1_P5", stage2Tag:"U11_A_PO2"},
    {__v:0,day:1,dateTime:42300000,duration:"8m",pitch:"1",competition:{name:"U11", section:"A"},tag:"QF1", homeTeam:"2nd Group 1", awayTeam:"3rd Group 2", homeTeamFrom:"U11_A_G1_P2", awayTeamFrom:"U11_A_G2_P3", stage2Tag:"U11_A_QF1"},
    {__v:0,day:1,dateTime:43200000,duration:"8m",pitch:"2",competition:{name:"U11", section:"A"},tag:"QF2", homeTeam:"2nd Group 2", awayTeam:"3rd Group 1", homeTeamFrom:"U11_A_G2_P2", awayTeamFrom:"U11_A_G1_P3", stage2Tag:"U11_A_QF2"},
    {__v:0,day:1,dateTime:44100000,duration:"8m",pitch:"1",competition:{name:"U11", section:"A"},tag:"QF3", homeTeam:"Winner Group 1", awayTeam:"Winner PO1", homeTeamFrom:"U11_A_G1_P1", awayTeamFrom:"U11_A_PO1", stage2Tag:"U11_A_QF3"},
    {__v:0,day:1,dateTime:45000000,duration:"8m",pitch:"2",competition:{name:"U11", section:"A"},tag:"QF4", homeTeam:"Winner Group 2", awayTeam:"Winner PO2", homeTeamFrom:"U11_A_G2_P1", awayTeamFrom:"U11_A_PO2", stage2Tag:"U11_A_QF4"},
    {__v:0,day:1,dateTime:45900000,duration:"8m",pitch:"1",competition:{name:"U11", section:"A"},tag:"SF1", homeTeam:"Winner QF1", awayTeam:"Winner QF4", homeTeamFrom:"U11_A_QF1", awayTeamFrom:"U11_A_QF4", stage2Tag:"U11_A_SF1"},
    {__v:0,day:1,dateTime:46800000,duration:"8m",pitch:"2",competition:{name:"U11", section:"A"},tag:"SF2", homeTeam:"Winner QF2", awayTeam:"Winner QF3", homeTeamFrom:"U11_A_QF2", awayTeamFrom:"U11_A_QF3", stage2Tag:"U11_A_SF2"},
    {__v:0,day:1,dateTime:47700000,duration:"8m",pitch:"1",competition:{name:"U11", section:"A"},tag:"FNL", homeTeam:"Winner SF1", awayTeam:"Winner SF2", homeTeamFrom:"U11_A_SF1", awayTeamFrom:"U11_A_SF2", stage2Tag:"U11_A_FNL"},
    {__v:0,day:2,dateTime:30600000,duration:"8m",pitch:"5",competition:{name:"U15", section:"Groups", group:"1"},tag:"1", homeTeam:"Sheffield Wednesday", awayTeam:"Brentford"},
    {__v:0,day:2,dateTime:31500000,duration:"8m",pitch:"5",competition:{name:"U15", section:"Groups", group:"1"},tag:"2", homeTeam:"Derby County", awayTeam:"Middlesbrough"},
    {__v:0,day:2,dateTime:32400000,duration:"8m",pitch:"5",competition:{name:"U15", section:"Groups", group:"1"},tag:"3", homeTeam:"Derby County", awayTeam:"Sheffield Wednesday"},
    {__v:0,day:2,dateTime:33300000,duration:"8m",pitch:"5",competition:{name:"U15", section:"Groups", group:"1"},tag:"4", homeTeam:"Brentford", awayTeam:"Middlesbrough"},
    {__v:0,day:2,dateTime:34200000,duration:"8m",pitch:"5",competition:{name:"U15", section:"Groups", group:"1"},tag:"5", homeTeam:"Middlesbrough", awayTeam:"Sheffield Wednesday"},
    {__v:0,day:2,dateTime:35100000,duration:"8m",pitch:"5",competition:{name:"U15", section:"Groups", group:"1"},tag:"6", homeTeam:"Brentford", awayTeam:"Derby County"},
    {__v:0,day:2,dateTime:30600000,duration:"8m",pitch:"6",competition:{name:"U15", section:"Groups", group:"2"},tag:"1", homeTeam:"Rotherham", awayTeam:"Cardiff"},
    {__v:0,day:2,dateTime:31500000,duration:"8m",pitch:"6",competition:{name:"U15", section:"Groups", group:"2"},tag:"2", homeTeam:"MK Dons", awayTeam:"Bristol City"},
    {__v:0,day:2,dateTime:32400000,duration:"8m",pitch:"6",competition:{name:"U15", section:"Groups", group:"2"},tag:"3", homeTeam:"MK Dons", awayTeam:"Rotherham"},
    {__v:0,day:2,dateTime:33300000,duration:"8m",pitch:"6",competition:{name:"U15", section:"Groups", group:"2"},tag:"4", homeTeam:"Cardiff", awayTeam:"Bristol City"},
    {__v:0,day:2,dateTime:34200000,duration:"8m",pitch:"6",competition:{name:"U15", section:"Groups", group:"2"},tag:"5", homeTeam:"Bristol City", awayTeam:"Rotherham"},
    {__v:0,day:2,dateTime:35100000,duration:"8m",pitch:"6",competition:{name:"U15", section:"Groups", group:"2"},tag:"6", homeTeam:"Cardiff", awayTeam:"MK Dons"},
    {__v:0,day:2,dateTime:30600000,duration:"8m",pitch:"7",competition:{name:"U15", section:"Groups", group:"3"},tag:"1", homeTeam:"Ipswich", awayTeam:"Preston North End"},
    {__v:0,day:2,dateTime:31500000,duration:"8m",pitch:"7",competition:{name:"U15", section:"Groups", group:"3"},tag:"2", homeTeam:"Hull City", awayTeam:"Reading"},
    {__v:0,day:2,dateTime:32400000,duration:"8m",pitch:"7",competition:{name:"U15", section:"Groups", group:"3"},tag:"3", homeTeam:"Hull City", awayTeam:"Ipswich"},
    {__v:0,day:2,dateTime:33300000,duration:"8m",pitch:"7",competition:{name:"U15", section:"Groups", group:"3"},tag:"4", homeTeam:"Preston North End", awayTeam:"Reading"},
    {__v:0,day:2,dateTime:34200000,duration:"8m",pitch:"7",competition:{name:"U15", section:"Groups", group:"3"},tag:"5", homeTeam:"Reading", awayTeam:"Ipswich"},
    {__v:0,day:2,dateTime:35100000,duration:"8m",pitch:"7",competition:{name:"U15", section:"Groups", group:"3"},tag:"6", homeTeam:"Preston North End", awayTeam:"Hull City"},
    {__v:0,day:2,dateTime:30600000,duration:"8m",pitch:"8",competition:{name:"U15", section:"Groups", group:"4"},tag:"1", homeTeam:"QPR", awayTeam:"Fulham FC"},
    {__v:0,day:2,dateTime:31500000,duration:"8m",pitch:"8",competition:{name:"U15", section:"Groups", group:"4"},tag:"2", homeTeam:"Birmingham", awayTeam:"Leeds"},
    {__v:0,day:2,dateTime:32400000,duration:"8m",pitch:"8",competition:{name:"U15", section:"Groups", group:"4"},tag:"3", homeTeam:"Birmingham", awayTeam:"QPR"},
    {__v:0,day:2,dateTime:33300000,duration:"8m",pitch:"8",competition:{name:"U15", section:"Groups", group:"4"},tag:"4", homeTeam:"Fulham FC", awayTeam:"Leeds"},
    {__v:0,day:2,dateTime:34200000,duration:"8m",pitch:"8",competition:{name:"U15", section:"Groups", group:"4"},tag:"5", homeTeam:"Leeds", awayTeam:"QPR"},
    {__v:0,day:2,dateTime:35100000,duration:"8m",pitch:"8",competition:{name:"U15", section:"Groups", group:"4"},tag:"6", homeTeam:"Fulham FC", awayTeam:"Birmingham"},
    {__v:0,day:2,dateTime:40500000,duration:"8m",pitch:"5",competition:{name:"U15", section:"Champions League", group:"1"},tag:"1", homeTeam:"Winner Group 1", awayTeam:"Winner Group 3", homeTeamFrom:"U15_Groups_G1_P1", awayTeamFrom:"U15_Groups_G3_P1"},
    {__v:0,day:2,dateTime:41400000,duration:"8m",pitch:"5",competition:{name:"U15", section:"Champions League", group:"1"},tag:"2", homeTeam:"2nd Group 2", awayTeam:"2nd Group 4", homeTeamFrom:"U15_Groups_G2_P2", awayTeamFrom:"U15_Groups_G4_P2"},
    {__v:0,day:2,dateTime:42300000,duration:"8m",pitch:"5",competition:{name:"U15", section:"Champions League", group:"1"},tag:"3", homeTeam:"2nd Group 2", awayTeam:"Winner Group 1", homeTeamFrom:"U15_Groups_G2_P2", awayTeamFrom:"U15_Groups_G1_P1"},
    {__v:0,day:2,dateTime:43200000,duration:"8m",pitch:"5",competition:{name:"U15", section:"Champions League", group:"1"},tag:"4", homeTeam:"Winner Group 3", awayTeam:"2nd Group 4", homeTeamFrom:"U15_Groups_G3_P1", awayTeamFrom:"U15_Groups_G4_P2"},
    {__v:0,day:2,dateTime:44100000,duration:"8m",pitch:"5",competition:{name:"U15", section:"Champions League", group:"1"},tag:"5", homeTeam:"2nd Group 4", awayTeam:"Winner Group 1", homeTeamFrom:"U15_Groups_G4_P2", awayTeamFrom:"U15_Groups_G1_P1"},
    {__v:0,day:2,dateTime:45000000,duration:"8m",pitch:"5",competition:{name:"U15", section:"Champions League", group:"1"},tag:"6", homeTeam:"Winner Group 3", awayTeam:"2nd Group 2", homeTeamFrom:"U15_Groups_G3_P1", awayTeamFrom:"U15_Groups_G2_P2"},
    {__v:0,day:2,dateTime:40500000,duration:"8m",pitch:"6",competition:{name:"U15", section:"Champions League", group:"2"},tag:"1", homeTeam:"Winner Group 2", awayTeam:"Winner Group 4", homeTeamFrom:"U15_Groups_G2_P1", awayTeamFrom:"U15_Groups_G4_P1"},
    {__v:0,day:2,dateTime:41400000,duration:"8m",pitch:"6",competition:{name:"U15", section:"Champions League", group:"2"},tag:"2", homeTeam:"2nd Group 3", awayTeam:"2nd Group 1", homeTeamFrom:"U15_Groups_G3_P2", awayTeamFrom:"U15_Groups_G1_P2"},
    {__v:0,day:2,dateTime:42300000,duration:"8m",pitch:"6",competition:{name:"U15", section:"Champions League", group:"2"},tag:"3", homeTeam:"2nd Group 3", awayTeam:"Winner Group 2", homeTeamFrom:"U15_Groups_G3_P2", awayTeamFrom:"U15_Groups_G2_P1"},
    {__v:0,day:2,dateTime:43200000,duration:"8m",pitch:"6",competition:{name:"U15", section:"Champions League", group:"2"},tag:"4", homeTeam:"Winner Group 4", awayTeam:"2nd Group 1", homeTeamFrom:"U15_Groups_G4_P1", awayTeamFrom:"U15_Groups_G1_P2"},
    {__v:0,day:2,dateTime:44100000,duration:"8m",pitch:"6",competition:{name:"U15", section:"Champions League", group:"2"},tag:"5", homeTeam:"2nd Group 1", awayTeam:"Winner Group 2", homeTeamFrom:"U15_Groups_G1_P2", awayTeamFrom:"U15_Groups_G2_P1"},
    {__v:0,day:2,dateTime:45000000,duration:"8m",pitch:"6",competition:{name:"U15", section:"Champions League", group:"2"},tag:"6", homeTeam:"Winner Group 4", awayTeam:"2nd Group 3", homeTeamFrom:"U15_Groups_G4_P1", awayTeamFrom:"U15_Groups_G3_P2"},
    {__v:0,day:2,dateTime:40500000,duration:"8m",pitch:"7",competition:{name:"U15", section:"Europa League", group:"1"},tag:"1", homeTeam:"3rd Group 1", awayTeam:"3rd Group 3", homeTeamFrom:"U15_Groups_G1_P3", awayTeamFrom:"U15_Groups_G3_P3"},
    {__v:0,day:2,dateTime:41400000,duration:"8m",pitch:"7",competition:{name:"U15", section:"Europa League", group:"1"},tag:"2", homeTeam:"4th Group 2", awayTeam:"4th Group 4", homeTeamFrom:"U15_Groups_G2_P4", awayTeamFrom:"U15_Groups_G4_P4"},
    {__v:0,day:2,dateTime:42300000,duration:"8m",pitch:"7",competition:{name:"U15", section:"Europa League", group:"1"},tag:"3", homeTeam:"4th Group 2", awayTeam:"3rd Group 1", homeTeamFrom:"U15_Groups_G2_P4", awayTeamFrom:"U15_Groups_G1_P3"},
    {__v:0,day:2,dateTime:43200000,duration:"8m",pitch:"7",competition:{name:"U15", section:"Europa League", group:"1"},tag:"4", homeTeam:"3rd Group 3", awayTeam:"4th Group 4", homeTeamFrom:"U15_Groups_G3_P3", awayTeamFrom:"U15_Groups_G4_P4"},
    {__v:0,day:2,dateTime:44100000,duration:"8m",pitch:"7",competition:{name:"U15", section:"Europa League", group:"1"},tag:"5", homeTeam:"4th Group 4", awayTeam:"3rd Group 1", homeTeamFrom:"U15_Groups_G4_P4", awayTeamFrom:"U15_Groups_G1_P3"},
    {__v:0,day:2,dateTime:45000000,duration:"8m",pitch:"7",competition:{name:"U15", section:"Europa League", group:"1"},tag:"6", homeTeam:"3rd Group 3", awayTeam:"4th Group 2", homeTeamFrom:"U15_Groups_G3_P3", awayTeamFrom:"U15_Groups_G2_P4"},
    {__v:0,day:2,dateTime:40500000,duration:"8m",pitch:"8",competition:{name:"U15", section:"Europa League", group:"2"},tag:"1", homeTeam:"3rd Group 2", awayTeam:"3rd Group 4", homeTeamFrom:"U15_Groups_G2_P3", awayTeamFrom:"U15_Groups_G4_P3"},
    {__v:0,day:2,dateTime:41400000,duration:"8m",pitch:"8",competition:{name:"U15", section:"Europa League", group:"2"},tag:"2", homeTeam:"4th Group 3", awayTeam:"4th Group 1", homeTeamFrom:"U15_Groups_G3_P4", awayTeamFrom:"U15_Groups_G1_P4"},
    {__v:0,day:2,dateTime:42300000,duration:"8m",pitch:"8",competition:{name:"U15", section:"Europa League", group:"2"},tag:"3", homeTeam:"4th Group 3", awayTeam:"3rd Group 2", homeTeamFrom:"U15_Groups_G3_P4", awayTeamFrom:"U15_Groups_G2_P3"},
    {__v:0,day:2,dateTime:43200000,duration:"8m",pitch:"8",competition:{name:"U15", section:"Europa League", group:"2"},tag:"4", homeTeam:"3rd Group 4", awayTeam:"4th Group 1", homeTeamFrom:"U15_Groups_G4_P3", awayTeamFrom:"U15_Groups_G1_P4"},
    {__v:0,day:2,dateTime:44100000,duration:"8m",pitch:"8",competition:{name:"U15", section:"Europa League", group:"2"},tag:"5", homeTeam:"4th Group 1", awayTeam:"3rd Group 2", homeTeamFrom:"U15_Groups_G1_P4", awayTeamFrom:"U15_Groups_G2_P3"},
    {__v:0,day:2,dateTime:45000000,duration:"8m",pitch:"8",competition:{name:"U15", section:"Europa League", group:"2"},tag:"6", homeTeam:"3rd Group 4", awayTeam:"4th Group 3", homeTeamFrom:"U15_Groups_G4_P3", awayTeamFrom:"U15_Groups_G3_P4"},
    {__v:0,day:2,dateTime:45900000,duration:"8m",pitch:"5",competition:{name:"U15", section:"Champions League"},tag:"SF1", homeTeam:"Winner Group 1", awayTeam:"2nd Group 2", homeTeamFrom:"U15_ChampionsLeague_G1_P1", awayTeamFrom:"U15_ChampionsLeague_G2_P2", stage2Tag:"U15_ChampionsLeague_SF1"},
    {__v:0,day:2,dateTime:46800000,duration:"8m",pitch:"6",competition:{name:"U15", section:"Champions League"},tag:"SF2", homeTeam:"Winner Group 2", awayTeam:"2nd Group 1", homeTeamFrom:"U15_ChampionsLeague_G2_P1", awayTeamFrom:"U15_ChampionsLeague_G1_P2", stage2Tag:"U15_ChampionsLeague_SF2"},
    {__v:0,day:2,dateTime:47700000,duration:"8m",pitch:"5",competition:{name:"U15", section:"Champions League"},tag:"FIN", homeTeam:"Winner SF1", awayTeam:"Winner SF2", homeTeamFrom:"U15_ChampionsLeague_SF1", awayTeamFrom:"U15_ChampionsLeague_SF2", stage2Tag:"U15_ChampionsLeague_FNL"},
    {__v:0,day:2,dateTime:45900000,duration:"8m",pitch:"7",competition:{name:"U15", section:"Europa League"},tag:"SF1", homeTeam:"Winner Group 1", awayTeam:"2nd Group 2", homeTeamFrom:"U15_EuropaLeague_G1_P1", awayTeamFrom:"U15_EuropaLeague_G2_P2", stage2Tag:"U15_EuropaLeague_SF1"},
    {__v:0,day:2,dateTime:46800000,duration:"8m",pitch:"8",competition:{name:"U15", section:"Europa League"},tag:"SF2", homeTeam:"Winner Group 2", awayTeam:"2nd Group 1", homeTeamFrom:"U15_EuropaLeague_G2_P1", awayTeamFrom:"U15_EuropaLeague_G1_P2", stage2Tag:"U15_EuropaLeague_SF2"},
    {__v:0,day:2,dateTime:47700000,duration:"8m",pitch:"7",competition:{name:"U15", section:"Europa League"},tag:"FIN", homeTeam:"Winner SF1", awayTeam:"Winner SF2", homeTeamFrom:"U15_EuropaLeague_SF1", awayTeamFrom:"U15_EuropaLeague_SF2", stage2Tag:"U15_EuropaLeague_FNL"}
];

let _news = [
    { title: "TEST Announcement", body: "Test announcement one" },
    { title: "Another TEST Announcement", body: "Test announcement two" }
]

let _pages = [
    { title: "Info Test", body: "Test page one" },
    { title: "Test Info", body: "Test page 2" }
]


// --------------------------------------------------------------------------
// EXPORTED STORE VARS
// --------------------------------------------------------------------------

export const news = writable(_news);
export const pages = writable(_pages);
export const results = writable(_results);
export const tournament = writable(_tournament);
export const highlight = writable('');


// fetch instead
let env = 'prod';
let baseUrl = 'http://192.168.21.100:4000/api';

const initFromApi = async () => {
    let res = await fetch(baseUrl + '/tournaments');
    let data = await res.json();
    tournament.set(data[0]);

    res = await fetch(baseUrl + '/results');
    data = await res.json();
    results.set(data);

    res = await fetch(baseUrl + '/news');
    data = await res.json();
    news.set(data);

    res = await fetch(baseUrl + '/pages');
    data = await res.json();
    pages.set(data);
};

if (env == 'prod') {
    initFromApi();
}
