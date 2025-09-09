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
    if(task.completed){
        li.classList.add("completed");
        return;
    }
    li.innerHTML = `
    <span>${task.text}</span>
    <button id="delete"><i class="fa-solid fa-trash"></i></button>
    `
    li.addEventListener("click", (e)=>{
        if(e.target.tagName === "BUTTON"){
            return;
        }
        task.completed = !task.completed;
        li.classList.toggle("completed");
        saveTask();
    });

    li.querySelector("#delete").addEventListener("click", (e)=>{
        e.stopPropagation() //prevenet toggle for firing
        tasks = tasks.filter(t => t.id !== task.id)
        li.remove();
        saveTask()
    })

    todoList.appendChild(li)
  }

  //to store out array in the local storage
  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
})