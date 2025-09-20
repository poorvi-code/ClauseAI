import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return alert("Please enter some text first!");
    setLoading(true);
    setSummary(""); // reset summary before new request
    try {
      const response = await axios.post("http://localhost:5000/summarize", {
        text,
      });
      if (response.data.summary) {
        setSummary(response.data.summary);
      } else if (response.data.error) {
        setSummary("❌ Backend Error: " + response.data.error);
      } else {
        setSummary("⚠️ No summary received from backend.");
      }
    } catch (error) {
      console.error("❌ Axios error:", error);
      setSummary(
        error.response?.data?.error
          ? "❌ Backend Error: " + error.response.data.error
          : "❌ Could not connect to backend. Check if server is running."
      );
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>📄 ClauseAI - Legal Document Summarizer</h2>

        <textarea
          rows="8"
          cols="60"
          placeholder="Paste your legal text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <br />
        <button onClick={handleSummarize} disabled={loading}>
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        {summary && (
          <div className="summary-box">
            <h3>Summary:</h3>
            <p>{summary}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
