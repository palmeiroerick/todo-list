from flask import Flask, render_template, jsonify, request

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
    return jsonify(TodoList), 200

@app.route("/api/todos/add", methods=["POST"])
def add_todo():
    if not (todo := request.form.get("todo")):
        return jsonify({ "error": "missing todo" }), 400

    TodoList.append({"todo": todo})
    return jsonify(TodoList), 200