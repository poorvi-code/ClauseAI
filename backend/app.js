const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { PythonShell } = require("python-shell");

const documentRoutes = require("./routes/documents");
const app = express();

// ===================
// Middleware
// ===================
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ===================
// MongoDB Connection
// ===================
mongoose
  .connect("mongodb://localhost:27017/clauseai", {})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((e) => console.error("❌ MongoDB connection error:", e));

// ===================
// Routes
// ===================
app.use("/api/documents", documentRoutes);

// ===================
// Summarization Route
// ===================
app.post("/summarize", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "No text provided" });

  let options = {
    mode: "text",
    pythonPath: path.join(__dirname, "../ai-models/venv/Scripts/python.exe"), // ✅ correct Python venv path
    scriptPath: path.join(__dirname, "../ai-models"), // folder where document_processor.py is located
    args: [text],
  };

  console.log("📨 Incoming summarization request...");

  PythonShell.run("document_processor.py", options, (err, results) => {
    if (err) {
      console.error("❌ Python error:", err);
      return res.status(500).json({ error: "Summarization failed" });
    }

    console.log("✅ Python results:", results);

    if (!results || results.length === 0) {
      return res.status(500).json({ error: "No summary returned" });
    }

    res.json({ summary: results.join(" ") });
  });
});

// ===================
// Start Server
// ===================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
