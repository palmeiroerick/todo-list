from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

TodoList = [
    { "id": 0, "todo": "Todo1" },
    { "id": 1, "todo": "Todo2" },
    { "id": 2, "todo": "Todo3" },
    { "id": 3, "todo": "Todo4" },
]

@app.route("/")
def hello_world():
    return render_template("index.html")

@app.route("/api/todos", methods=["GET"])
def todo_list():
    return jsonify(TodoList), 200

@app.route("/api/todos/add", methods=["POST"])
def add_todo():
    if not (todo := request.form.get("todo")):
        return jsonify({ "error": "missing todo" }), 400

    next_id = max(t['id'] for t in TodoList) + 1 if TodoList else 0
    TodoList.append({"id": next_id, "todo": todo})
    return jsonify(TodoList), 200

# TODO: todo_id may not exist, handle it when you have a database
@app.route("/api/todos/delete/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    global TodoList
    TodoList = [todo for todo in TodoList if todo["id"] != todo_id]
    return jsonify(TodoList), 200