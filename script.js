let content;
window.onload = () => { content = document.getElementById("content"); }
const DONE_TASK_TEXT_CLASS = "task-input-text-corssed";

function addEmptyTask() {
    let task = createEmptyTask();
    content.appendChild(task);
}

function createRawTask() {
    // this function creates just the task object with the relevent event handlers, without inner elements
    let newTask = document.createElement("div");
    newTask.classList.add("task")
    return newTask;
}

function addTaskInputBar(task) {
    // this function will add to the task the input bar section, and will return the input bar object.
    let taskInput = document.createElement("input");
    taskInput.classList.add("task-input-text");
    taskInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            taskInput.blur();
        }
    })
    task.appendChild(taskInput);
    return taskInput;
}

function addTaskDeleteButton(task) {
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-button");
    deleteButton.onclick = () => { deleteTask(task) };
    task.appendChild(deleteButton);
}

function addTaskFinishedButton(task, taskInput) {
    let finishedButton = document.createElement("button");
    finishedButton.textContent = '\u{02713}';
    finishedButton.classList.add("finished-button");
    finishedButton.onclick = () => { chageTaskDoneMark(taskInput) };
    task.appendChild(finishedButton);
}

function createEmptyTask() {
    let newTask = createRawTask();
    taskInput = addTaskInputBar(newTask)
    addTaskDeleteButton(newTask)
    addTaskFinishedButton(newTask, taskInput)
    return newTask;
}

function deleteTask(task) {
    content.removeChild(task);
    task.remove();
}

function chageTaskDoneMark(taskInput) {
    if (taskInput.classList.contains(DONE_TASK_TEXT_CLASS)) {
        taskInput.classList.remove(DONE_TASK_TEXT_CLASS);
    } else {
        taskInput.classList.add(DONE_TASK_TEXT_CLASS);
    }
}

