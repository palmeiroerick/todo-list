from flask import Flask, render_template, jsonify

app = Flask(__name__)

TodoList = [
    { "todo": "Todo1" },
    { "todo": "Todo2" },
    { "todo": "Todo3" },
    { "todo": "Todo4" },
]

@app.route("/")
def hello_world():
    return render_template("index.html")

@app.route("/api/todos")
def todo_list():
    return jsonify(TodoList)