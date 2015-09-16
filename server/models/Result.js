var mongoose = require('mongoose');

var ResultSchema = new mongoose.Schema({
    competition: {
        name: { type: String, required: true },
        section: { type: String, required: true },
        group: { type: Number, min: 1 }
    },
    tag: { type: String, required: true },
    index: { type: Number, min: 1, required: true },
    pitch: { type: String },
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
    if ('homeGoals' in this && this.homeGoals >= 0) {
        return this.homeGoals + (this.awayPens || this.homePens ? '(' + this.homePens + ')' : '');
    } else {
        return '';
    }
});

ResultSchema.virtual('awayScore').get(function () {
    if ('awayGoals' in this && this.awayGoals >= 0) {
        return (this.awayPens || this.homePens ? '(' + this.awayPens + ')' : '') + this.awayGoals;
    } else {
        return '';
    }
});


module.exports = mongoose.model('Result', ResultSchema);
