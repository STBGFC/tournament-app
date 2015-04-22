var mongoose = require('mongoose');

var CompetitionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    section: { type: String, required: true },
    groups: { type: Number, default: 0 }
}, {id: false});

var TournamentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    club: String,
    siteUrl: String,
    competitions: [CompetitionSchema]
});

module.exports = mongoose.model('Tournament', TournamentSchema);
