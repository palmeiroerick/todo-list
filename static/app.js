const TodoList = document.getElementById("todo-list");

fetch("/api/todos")
    .then(res => res.json())
    .then(tasks => {
        for (const task of tasks) {
            TodoList.innerHTML += `<li>${task.todo}</li>`
        }
    })