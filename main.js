
function saveTasks(tasks) {
    localStorage.setItem("task", JSON.stringify(tasks));
}

function loadTasks() {
    let taskArray = JSON.parse(localStorage.getItem("task")) || [];
    document.getElementById("todoList").innerHTML = "";
    taskArray.forEach(taskObj => {
        const newLi = document.createElement("li");
        const btn = document.createElement("button");
        newLi.textContent = taskObj.task;
        newLi.setAttribute("data-id", taskObj.id);
        if (taskObj.completed) {
            newLi.style.textDecoration = "line-through";
        }
        newLi.appendChild(btn);
        btn.addEventListener("click", function(e) {
            const parentLi = e.target.parentElement;
            const taskId = parentLi.getAttribute("data-id");
            let savedTasks = JSON.parse(localStorage.getItem("task")) || [];
            savedTasks = savedTasks.filter(taskObj => taskObj.id !== taskId);
            saveTasks(savedTasks);
            parentLi.remove();
        })
        document.getElementById("todoList").appendChild(newLi);
    })
}


document.getElementById("todoForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const task = document.getElementById("taskInput").value;
    let savedTasks = JSON.parse(localStorage.getItem("task")) || [];
    const taskId = Date.now().toString();
    savedTasks.push({id: taskId, task: task, completed: false});
    saveTasks(savedTasks);
    loadTasks();
    document.getElementById("taskInput").value = "";
});

document.getElementById("todoList").addEventListener("click", function(e) { 
    if (e.target.tagName === "LI") {
        const taskId = e.target.getAttribute("data-id");
        let savedTasks = JSON.parse(localStorage.getItem("task")) || [];
        const taskIndex = savedTasks.findIndex(taskObj => taskObj.id === taskId);
        if (e.target.style.textDecoration === "line-through") {
            e.target.style.textDecoration = "none";
            savedTasks[taskIndex].completed = false;
        } else {
            e.target.style.textDecoration = "line-through";
            savedTasks[taskIndex].completed = true;
        }
        saveTasks(savedTasks);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});
