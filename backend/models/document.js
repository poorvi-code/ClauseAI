const mongoose = require('mongoose');


const DocumentSchema = new mongoose.Schema({
fileName: { type: String, required: true },
originalText: { type: String, required: true },
summary: { type: String, required: true },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Document', DocumentSchema);