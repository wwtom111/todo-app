let todos = [];

// On Enter
document.getElementById("addTask").addEventListener("keyup", (e) => {
    e.preventDefault();
    if(e.keyCode === 13){
        addTask();
    }
});

// All tasks
document.getElementById("all-tasks").addEventListener("click", (e) => {
    e.preventDefault();
    listAllTasks();
});

// // Active Tasks
document.getElementById("active-tasks").addEventListener("click", (e) => {
    e.preventDefault();
    listActiveTasks();
});

// Completed Tasks
document.getElementById("completed-tasks").addEventListener("click", (e) => {
    e.preventDefault();
    listCompletedTasks();
});

// Clear Completed Tasks
document.getElementById("clear-completed").addEventListener("click", (e) => {
    e.preventDefault();
    clearCompletedTasks();
});

let clickCount = 0;
document.getElementById("toggle-btn").addEventListener("click", (e)=> {
    e.preventDefault();
    clickCount++;
    if(clickCount == 1){
        markAllAsComplete();
    }else if(clickCount == 2){
        markAllAsActive();
        clickCount = 0;
    }
});

const clearCompletedTasks = () => {
    let tasks = document.querySelectorAll("input[type=checkbox]");
    tasks.forEach(checkbox => {
        let taskLi = checkbox.parentElement;
        if(checkbox.checked === true){
            taskLi.remove();
        }
    });
}

const listAllTasks = () => {
    let tasks = document.querySelectorAll("input[type=checkbox]");
    tasks.forEach(checkbox => {
        let taskLi = checkbox.parentElement;
        taskLi.classList.remove("hidden");
    });
}

const listActiveTasks = () => {
    let tasks = document.querySelectorAll("input[type=checkbox]");
    tasks.forEach(checkbox => {
        let taskLi = checkbox.parentElement;
        if(checkbox.checked === false){
            taskLi.classList.remove("hidden");
        }
        if(checkbox.checked === true){
            taskLi.classList.add("hidden");
        }
    });
}

const listCompletedTasks = () => {
    let tasks = document.querySelectorAll("input[type=checkbox]");
    tasks.forEach(checkbox => {
        let taskLi = checkbox.parentElement;
        if(checkbox.checked === true){
            taskLi.classList.remove("hidden");
        }
        if(checkbox.checked === false){
            taskLi.classList.add("hidden");
        }
    });
}

const markAllAsActive = () => {
    document.querySelectorAll("input[type=checkbox]")
    .forEach(task => {
        if(task.checked === true){
            task.checked = false;
            isComplete(task);
        }
    });
    taskCount();
}

const markAllAsComplete = () => {
    document.querySelectorAll("input[type=checkbox]")
    .forEach(task => {
        if(task.checked === false){
            task.checked = true;
            isComplete(task);
        }
    });
    taskCount();
}

const isComplete = checkbox => {
    let task = checkbox.parentElement;
    if(checkbox.checked === true){
        task.classList.add("completed");
    }else{
        task.classList.remove("completed");
    }
    taskCount();
}

const deleteTask = (li) => {
    li.parentElement.remove();
    let updated = todos.filter(task => task != li.parentElement);
    todos = updated;
    taskCount();
}

const createChildLi = li => {
    // Delete Btn
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.setAttribute("class", "delete");
    span.setAttribute("id","delete");
    span.setAttribute("onclick", "deleteTask(this)");
    span.appendChild(txt);
    // Check Btn
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "checkbox");
    checkbox.setAttribute("onclick", "isComplete(this)");
    // Append to task li
    li.appendChild(span);
    li.appendChild(checkbox);
}

const taskCount = () => {
    let count = 0;
    let tasks = document.querySelectorAll("input[type=checkbox]");
    tasks.forEach(checkbox => {
        count++;
        if(checkbox.checked === true){
            count--;
        }
    });
    if(count === 1){
        document.getElementById("todo-count").innerText = count + " Task left";
    }else{
        document.getElementById("todo-count").innerText = count + " Tasks left";
    }
}

const addTask = () => {
    let listItem = document.createElement("li");
    listItem.setAttribute("class", "task-li");
    let inputValue = document.getElementById("addTask").value;
    let title = document.createTextNode(inputValue);
    listItem.appendChild(title);
    if(inputValue === ""){
        alert("Enter what needs to be done!");
        return;
    }else {
        document.getElementById("task-list").appendChild(listItem);
    }
    
    createChildLi(listItem);
    todos.push(listItem);
    document.getElementById("addTask").value = "";
    taskCount();
}