let tasks = [
  { id: 1, text: "Check the rover battery", done: false },
  { id: 2, text: "Review the Mars landing map", done: true },
  { id: 3, text: "Brief Rania on the launch plan", done: false }
];

let nextId = 4;

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");
const emptyMsg = document.getElementById("empty-msg");
const clearDoneBtn = document.getElementById("clear-done");


function renderTasks() {
  list.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    const li = document.createElement("li");
    li.dataset.id = task.id;

    if (task.done) {
      li.classList.add("done");
    }

    const span = document.createElement("span");
    span.textContent = task.text;
    span.classList.add("task-text");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  }

  updateCounter();
}


function updateCounter() {
  let remaining = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].done === false) {
      remaining = remaining + 1;
    }
  }

  counter.textContent = remaining + " task(s) remaining";

  if (tasks.length === 0) {
    emptyMsg.classList.remove("hidden");
  } else {
    emptyMsg.classList.add("hidden");
  }
}


form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = input.value.trim();
  if (text === "") {
    return;
  }

  const newTask = { id: nextId, text: text, done: false };
  tasks.push(newTask);
  nextId = nextId + 1;

  input.value = "";
  renderTasks();
});


list.addEventListener("click", function (event) {
  const clicked = event.target;
  const li = clicked.parentElement;
  const id = Number(li.dataset.id);

  if (clicked.classList.contains("task-text")) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        tasks[i].done = !tasks[i].done;
      }
    }
    renderTasks();
  }

  if (clicked.classList.contains("delete-btn")) {
    const newTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id !== id) {
        newTasks.push(tasks[i]);
      }
    }
    tasks = newTasks;
    renderTasks();
  }
});


clearDoneBtn.addEventListener("click", function () {
  const newTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].done === false) {
      newTasks.push(tasks[i]);
    }
  }
  tasks = newTasks;
  renderTasks();
});


renderTasks();