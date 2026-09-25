/* ============================================================
   MISSION CHECKLIST — completed version
   ============================================================ */

let tasks = [
  { id: 1, text: "Check the rover battery", done: false },
  { id: 2, text: "Review the Mars landing map", done: true },
  { id: 3, text: "Brief Rania on the launch plan", done: false }
];

let nextId = 4;


/* ============================================================
   STEP 1: SELECT THE ELEMENTS
   ============================================================ */

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");
const emptyMsg = document.getElementById("empty-msg");
const clearDoneBtn = document.getElementById("clear-done");

// Bonus 1
const charCount = document.getElementById("char-count");

// Bonus 3
let currentFilter = "all";
const filterButtons = document.querySelectorAll(".filter-btn");


/* ============================================================
   STEP 2: renderTasks()
   ============================================================ */

function renderTasks() {
  list.innerHTML = "";

  for (const task of tasks) {

    // Bonus 3: skip tasks that don't match the current filter
    if (currentFilter === "active" && task.done === true) {
      continue;
    }
    if (currentFilter === "done" && task.done === false) {
      continue;
    }

    const li = document.createElement("li");
    li.dataset.id = task.id;

    const span = document.createElement("span");
    span.textContent = task.text;
    span.classList.add("task-text");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    li.appendChild(span);
    li.appendChild(deleteBtn);

    if (task.done === true) {
      li.classList.add("done");
    }

    list.appendChild(li);
  }

  updateCounter();
}


/* ============================================================
   STEP 4: updateCounter()
   ============================================================ */

function updateCounter() {
  let remaining = 0;

  for (const task of tasks) {
    if (task.done === false) {
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


/* ============================================================
   STEP 5: ADD A NEW TASK WITH THE FORM
   ============================================================ */

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = input.value.trim();

  if (text === "") {
    return;
  }

  // Bonus 2: don't add the task if the same text already exists
  let alreadyExists = false;
  for (const task of tasks) {
    if (task.text.toLowerCase() === text.toLowerCase()) {
      alreadyExists = true;
    }
  }
  if (alreadyExists === true) {
    return;
  }

  const newTask = { id: nextId, text: text, done: false };
  tasks.push(newTask);
  nextId = nextId + 1;

  input.value = "";
  charCount.textContent = "0 / 50"; // Bonus 1 reset

  renderTasks();
});


/* ============================================================
   STEP 6: TOGGLE DONE AND DELETE (event delegation)
   ============================================================ */

list.addEventListener("click", function (event) {
  const target = event.target;
  const li = target.parentElement;
  const id = Number(li.dataset.id);

  if (target.classList.contains("task-text")) {
    for (const task of tasks) {
      if (task.id === id) {
        task.done = !task.done;
      }
    }
    renderTasks();
  }

  if (target.classList.contains("delete-btn")) {
    const newTasks = [];
    for (const task of tasks) {
      if (task.id !== id) {
        newTasks.push(task);
      }
    }
    tasks = newTasks;
    renderTasks();
  }
});


/* ============================================================
   STEP 7: CLEAR COMPLETED TASKS
   ============================================================ */

clearDoneBtn.addEventListener("click", function () {
  const newTasks = [];
  for (const task of tasks) {
    if (task.done === false) {
      newTasks.push(task);
    }
  }
  tasks = newTasks;
  renderTasks();
});


/* ============================================================
   BONUS 1: LIVE CHARACTER COUNTER
   ============================================================ */

input.addEventListener("input", function () {
  charCount.textContent = input.value.length + " / 50";
});


/* ============================================================
   BONUS 3: FILTER BUTTONS
   ============================================================ */

for (const btn of filterButtons) {
  btn.addEventListener("click", function () {
    currentFilter = btn.dataset.filter;

    for (const otherBtn of filterButtons) {
      otherBtn.classList.remove("active");
    }
    btn.classList.add("active");

    renderTasks();
  });
}


/* ===== STEP 3: draw the list when the page loads ===== */
renderTasks();