
import sys
from transformers import pipeline

def main():
    # ✅ Ensure input text exists
    if len(sys.argv) < 2:
        print("Error: No input text provided.")
        sys.exit(1)

    text = sys.argv[1]

    try:
        # ✅ Load summarizer (will download model first time)
        summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

        # ✅ Generate summary
        summary = summarizer(
            text,
            max_length=60,
            min_length=10,
            do_sample=False
        )

        # ✅ Print summary (Node.js will capture this)
        print(summary[0]['summary_text'])

    except Exception as e:
        # If something goes wrong, return the error
        print(f"Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()
