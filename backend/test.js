const axios = require("axios");

async function testSummarize() {
  try {
    const response = await axios.post("http://localhost:5000/summarize", {
      text: "This is a sample agreement for testing.",
    });

    console.log("✅ Summary from backend:", response.data);
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.response) {
      console.error("Response:", error.response.data);
    }
  }
}

testSummarize();
