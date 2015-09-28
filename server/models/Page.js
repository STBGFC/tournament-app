var mongoose = require('mongoose');

var PageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Page', PageSchema);
