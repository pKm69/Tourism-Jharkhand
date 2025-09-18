# server.py
import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise Exception("❌ Missing GROQ_API_KEY in .env")

BASE_URL = "https://api.groq.com/openai/v1"

app = Flask(__name__)
CORS(app)

def generate_itinerary(destination, num_days, interests):
    """Use Groq API to generate travel itinerary"""
    prompt = f"""
    You are a professional travel planner. Create a detailed, day-by-day travel itinerary
    for {destination} lasting {num_days} days for someone interested in {interests}.

    Format:
    Day 1:
    - Morning: ...
    - Afternoon: ...
    - Evening: ...

    Day 2:
    - ...
    """

    url = f"{BASE_URL}/chat/completions"
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "llama-3.1-8b-instant",   # ✅ lightweight + available model
        "messages": [
            {"role": "system", "content": "You are a helpful travel planner."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7,
        "max_tokens": 700
    }
    try:
        resp = requests.post(url, headers=headers, json=payload, timeout=60)
        resp.raise_for_status()
        data = resp.json()
        return data["choices"][0]["message"]["content"]
    except Exception as e:
        return f"⚠️ Groq API error: {e}"

@app.route("/generate-itinerary", methods=["POST"])
def itinerary_route():
    data = request.json
    destination = data.get("destination")
    num_days = data.get("num_days")
    interests = data.get("interests")

    if not all([destination, num_days, interests]):
        return jsonify({"error": "Missing required fields"}), 400

    itinerary = generate_itinerary(destination, num_days, interests)
    return jsonify({"itinerary": itinerary})

@app.route("/")
def home():
    return "🌍 Groq Travel Planner Backend Running!"

if __name__ == "__main__":
    app.run(debug=True)
