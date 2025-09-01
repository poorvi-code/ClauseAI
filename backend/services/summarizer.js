const { PythonShell } = require('python-shell');
const fs = require('fs');
const os = require('os');
const path = require('path');


const summarizeDocument = async (text) => {
// Write text to a temp file to avoid OS arg length limits
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'clauseai-'));
const tmpFile = path.join(tmpDir, 'input.txt');
fs.writeFileSync(tmpFile, text, 'utf8');


const scriptPath = path.resolve(__dirname, '../ai-models');


const options = {
mode: 'text',
pythonPath: 'python3',
scriptPath,
args: ['--file', tmpFile]
};


return new Promise((resolve, reject) => {
PythonShell.run('document_processor.py', options, (err, results) => {
try {
fs.rmSync(tmpDir, { recursive: true, force: true });
} catch (_) {}
if (err) return reject(err);
resolve(results && results[0] ? results[0] : '');
});
});
};


module.exports = { summarizeDocument };