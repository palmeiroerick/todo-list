const TodoList = document.getElementById("todo-list");

function render(tasks) {
    TodoList.innerHTML = tasks.map(task => `<li>${task.todo}</li>`).join("");
}

fetch("/api/todos").then(res => res.json()).then(tasks => render(tasks));

const form = document.getElementById("add-todo");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        const response = await fetch("/api/todos/add", {
            method: "POST",
            body: new FormData(form)
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }

        const tasks = await response.json();

        render(tasks);

        form.reset();
    } catch (error) {
        console.error(error);
    }
})