document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addBtn = document.getElementById("add-btn");
  const todoList = document.getElementById("todo-list");

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => renderTask(task));

  // Add new task
  addBtn.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);
    saveTask();
    renderTask(newTask);
    todoInput.value = "";
  });

  // --- Rendering tasks ---
  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    // ✅ checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    checkbox.checked = task.completed;

    // ✅ task text
    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    // ✅ button container
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");

    // edit button
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;

    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.id = "delete";
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    // append buttons into container
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    // --- append everything into li ---
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btnContainer);
    todoList.appendChild(li);

    // ✅ checkbox toggle
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      li.classList.toggle("completed", task.completed);
      saveTask();
    });

    // ✅ edit functionality
    editBtn.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;
      input.classList.add("edit-input");

      li.replaceChild(input, span);
      input.focus();

      const saveEdit = () => {
        task.text = input.value.trim() || task.text;
        span.textContent = task.text;
        li.replaceChild(span, input);
        saveTask();
      };

      input.addEventListener("blur", saveEdit);
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") saveEdit();
      });
    });

    // ✅ delete task
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTask();
    });
  }

  // Save to localStorage
  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
