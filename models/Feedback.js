var mongoose = require('mongoose');

var FeedbackSchema = new mongoose.Schema({
    email: { type: String, required: true },
    body: { type: String, required: true },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
