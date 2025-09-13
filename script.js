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
    
    //checkbox
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("task-checkbox")
    checkBox.checked = task.completed;

    //Task text
    let taskText = document.createElement("span");
    taskText.textContent = task.text;
    if(task.completed){
      li.classList.add("completed")
    }

    //div container for button
    let divBtn = document.createElement("div");
    divBtn.classList.add("btn-container")

    //edit button
    let editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`

    //delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-dtn");
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`

    //append button
    divBtn.appendChild(editBtn)
    divBtn.appendChild(deleteBtn)

    //append on li all the elements
    li.appendChild()

    todoList.appendChild(li)
  }

  //to store out array in the local storage
  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
})