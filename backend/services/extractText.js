const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');


async function extractFromPDF(filePath) {
const dataBuffer = fs.readFileSync(filePath);
const result = await pdfParse(dataBuffer);
return result.text || '';
}


async function extractFromDocx(filePath) {
const result = await mammoth.extractRawText({ path: filePath });
return result.value || '';
}


async function extractFromTxt(filePath) {
return fs.readFileSync(filePath, 'utf8');
}


async function extractText(filePath) {
const ext = path.extname(filePath).toLowerCase();
if (ext === '.pdf') return extractFromPDF(filePath);
if (ext === '.docx') return extractFromDocx(filePath);
if (ext === '.txt') return extractFromTxt(filePath);
// Fallback: try reading as UTF-8
return extractFromTxt(filePath);
}


module.exports = { extractText };