//  principales del DOM
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");


function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll(".task-item span");
    taskItems.forEach(item => {
        tasks.push(item.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function createTaskElement(taskText) {
    // <li>
    const li = document.createElement("li");
    li.classList.add("task-item");

    
    const span = document.createElement("span");
    span.textContent = taskText;

    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks(); 
    });

    
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    
    saveTasks();
}


addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim(); 
    if (taskText !== "") {
        createTaskElement(taskText);
        taskInput.value = ""; 
    }
});

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTaskBtn.click();
    }
});


function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const tasksArray = JSON.parse(savedTasks);
        tasksArray.forEach(task => createTaskElement(task));
    }
}


loadTasks();
