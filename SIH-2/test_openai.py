import os
import openai
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

try:
    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": "Say hello!"}]
    )
    print("✅ OpenAI API key is active!")
    print("Response:", response.choices[0].message.content)
except Exception as e:
    print("❌ OpenAI API key error:", e)
