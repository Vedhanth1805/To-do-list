// Load tasks from localStorage
window.onload = function() {
  loadTasks();
  updateClock();
  setInterval(updateClock, 1000);
};

// Add Task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const task = { text: taskText, completed: false };
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";
  renderTasks();
}

// Load Tasks from localStorage
function loadTasks() {
  renderTasks();
}

// Render Tasks
function renderTasks() {
  const taskList = document.getElementById("taskList");
  const tasks = getTasks();
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})">🗑️</button>
    `;

    taskList.appendChild(li);
  });
}

// Get tasks from localStorage
function getTasks() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

// Toggle task completion
function toggleComplete(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Delete task
function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Clock
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById("clock").textContent = timeString;
}

// Theme toggle
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

