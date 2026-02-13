from os import getenv
from xmlrpc import client
from flask import Flask, jsonify, render_template, request
from google import genai

app = Flask(__name__)
GEMINI_API_KEY = getenv("GEMINI_API_KEY")
client = genai.Client()

# rotas
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data["message"]

    response = client.models.generate_content(
    model="gemini-3-flash-preview", 
    contents=user_message
)
    
    reply = response.text if response.text else "Desculpe, não consegui gerar uma resposta."
    return jsonify({"reply": reply})


if __name__ == '__main__':
    app.run(debug=True)