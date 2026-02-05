from os import getenv
from flask import Flask, jsonify, render_template, request
from openai import OpenAI

app = Flask(__name__)

# rotas
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data["message"]

    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=getenv("OPENROUTER_API_KEY"),
    )

    completion = client.chat.completions.create(
    model="openrouter/free",

    messages=[
        {
        "role": "user",
        "content": user_message
        }
    ]
)
    
    reply = completion.choices[0].message.content
    return jsonify({"reply": reply}
)


if __name__ == '__main__':
    app.run(debug=True)