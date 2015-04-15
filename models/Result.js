var mongoose = require('mongoose');

var ResultSchema = new mongoose.Schema({
    competition: {
        name: { type: String, required: true },
        section: { type: String, required: true },
        group: { type: Number, min: 1 }
    },
    tag: { type: String, required: true },
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    homeGoals: { type: Number, min: 0 },
    awayGoals: { type: Number, min: 0 },
    homePens: { type: Number, min: 0 },
    awayPens: { type: Number, min: 0 }
}, {
    toObject: { virtuals: true }, toJSON: { virtuals: true }
});

ResultSchema.virtual('homeScore').get(function () {
    return this.homeGoals + (this.homePens ? '(' + this.homePens + ')' : '');
});

ResultSchema.virtual('awayScore').get(function () {
    return (this.awayPens ? '(' + this.awayPens + ')' : '') + this.awayGoals;
});


module.exports = mongoose.model('Result', ResultSchema);
