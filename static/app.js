const TodoList = document.getElementById("todo-list");

function render(tasks) {
    TodoList.replaceChildren();

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.id = task.id;

        const span = document.createElement("span");
        span.textContent = task.todo;

        const btn = document.createElement("button");
        btn.textContent = "x";

        li.appendChild(span);
        li.appendChild(btn);
        TodoList.appendChild(li);
    });
}

fetch("/api/todos", { method: "GET" }).then(res => res.json()).then(tasks => render(tasks));

const form = document.getElementById("add-todo");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        const response = await fetch("/api/todos/add", {
            method: "POST",
            body: new FormData(form),
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

TodoList.addEventListener("click", async (event) => {
    if (event.target.matches("button")) {
        try {
            const response = await fetch(`/api/todos/delete/${event.target.closest("li").id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error);
            }

            const tasks = await response.json();

            render(tasks);
        } catch (error) {
            console.error(error);
        }
    }
})