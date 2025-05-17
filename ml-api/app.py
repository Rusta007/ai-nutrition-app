from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
from datetime import datetime
import os
import requests

# OPENROUTER_API_KEY=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


from utils.image_model import predict_image

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure upload folder AFTER initializing the app
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load API key
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
if not OPENROUTER_API_KEY:
    raise ValueError("❌ Please set OPENROUTER_API_KEY in your .env file")

# In-memory chat history
chat_history = []

# GET /api/history
@app.route("/api/history", methods=["GET"])
def get_history():
    return jsonify(chat_history)

# POST /api/history
@app.route("/api/history", methods=["POST"])
def post_history():
    data = request.json
    question = data.get("question")
    answer = data.get("answer")

    if not question or not answer:
        return jsonify({"error": "Missing question or answer"}), 400

    new_entry = {
        "id": len(chat_history) + 1,
        "question": question,
        "answer": answer,
        "timestamp": datetime.now().isoformat(),
    }
    chat_history.append(new_entry)
    return jsonify({"success": True, "message": "Chat history saved", "entry": new_entry}), 201

# POST /chat
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message")

    if not user_message:
        return jsonify({"error": "Missing 'message' in request body"}), 400

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": "mistralai/mistral-7b-instruct",
                "messages": [
                    {"role": "system", "content": "You are a helpful nutrition assistant."},
                    {"role": "user", "content": user_message},
                ]
            }
        )
        data = response.json()
        reply = data.get("choices", [{}])[0].get("message", {}).get("content")

        if reply:
            return jsonify({"reply": reply})
        else:
            return jsonify({"error": "No response from assistant"}), 500
    except Exception as e:
        print("OpenRouter API Error:", str(e))
        return jsonify({"error": "Failed to get response from AI assistant"}), 500

# POST /image
@app.route("/image", methods=["POST"])
def image_recognition():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "Empty file name"}), 400

    filename = secure_filename(file.filename)
    path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(path)

    try:
        prediction = predict_image(path)
        os.remove(path)
        return jsonify({"success": True, "prediction": prediction})
    except Exception as e:
        return jsonify({"error": f"Image processing failed: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=int(os.getenv("PORT", 5000)))
