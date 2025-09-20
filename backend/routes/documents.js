const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Document = require('../models/document');
const { summarizeDocument } = require('../services/summarizer');
const { extractText } = require('../services/extractText');


// Multer storage (disk)
const upload = multer({ dest: path.resolve(__dirname, '../../uploads') });


// POST /api/documents – accepts multipart/form-data with `file`
router.post('/', upload.single('file'), async (req, res) => {
try {
// Support both: (A) file upload OR (B) raw JSON { text, fileName }
let text = req.body?.text;
let fileName = req.body?.fileName;


if (req.file) {
fileName = req.file.originalname;
const filePath = req.file.path;
text = await extractText(filePath);
// cleanup uploaded file
try { fs.unlinkSync(filePath); } catch (_) {}
}


if (!text || !fileName) {
return res.status(400).json({ error: 'Missing document: provide a file or {text, fileName}' });
}


const summary = await summarizeDocument(text);


const document = new Document({
fileName,
originalText: text,
summary
});


await document.save();
res.json({
_id: document._id,
fileName: document.fileName,
summary: document.summary,
createdAt: document.createdAt
});
} catch (err) {
console.error(err);
res.status(500).json({ error: err.message || 'Server error' });
}
});


module.exports = router;