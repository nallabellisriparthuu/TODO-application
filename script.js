document.addEventListener("DOMContentLoaded", ()=>{
  //Grabbing elements we want o manipulate
  const todoInput = document.getElementById("todo-input");
  const addBtn = document.getElementById("add-btn");
  const todoList = document.getElementById("todo-list");

  //To store the task in array
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => renderTask(task));
  //adding event to the button to perform action when we click
  addBtn.addEventListener("click", () => {
    //we can write the task in the input after giving space also
    const taskTest = todoInput.value.trim();

    //if the given input is empty return same
    if (taskTest === "") return;

    //creating object to store values in the array
    const newTask = {
      id: Date.now(), //gives an unique id
      text: taskTest, //this value will be take from the input
      completed: false, //give false if the task is not done
    };
    tasks.push(newTask); //pushing object in the array
    saveTask();
    renderTask(newTask);
    todoInput.value = ""; //clear input
    console.log(tasks);
  });

  //rendering task
  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    
    // ✅ Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    checkbox.checked = task.completed;

    // ✅ Task text
    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    // ✅ Button container
    const btnCont = document.createElement("div");
    btnCont.classList.add("btn-cont");

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    // Append buttons
    btnCont.appendChild(editBtn);
    btnCont.appendChild(deleteBtn);

    // Build li
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btnCont);
    todoList.appendChild(li);

    // ✅ Checkbox toggle strike-through
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      li.classList.toggle("completed", task.completed);
      saveTask();
    });

    // ✅ Edit task
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

    // ✅ Delete task
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTask();
    });

  }

  //to store out array in the local storage
  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
})