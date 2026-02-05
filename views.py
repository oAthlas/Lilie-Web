from main import app
from flask import render_template, request, jsonify

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=["POST"])
def chat():
    data = request.get_json
    user_message = data["message"]

    # temporario
    reply = f"Você disse: {user_message}"

    return jsonify({"reply": reply})