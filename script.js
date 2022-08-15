import { htmlTask } from './task/htmlTask.js';

const CURRENT_STATE_SOTRAGE_KEY = "current-state";
const CURRENT_DRAGGABLE_TASK_DATA_KEY = "current-dragged-task-index";
let tasks = [];
let content;

window.onload = () => {
    content = document.getElementById("content");
    loadFromLocalStorage();
}

function drop(event) {
    // this function is the function that will be called from the event "drop" of the object htmlTask.

    let currentDraggedTaskIndex = event.dataTransfer.getData(CURRENT_DRAGGABLE_TASK_DATA_KEY);
    let currentDraggedTask = tasks[currentDraggedTaskIndex];
    let indexOfDroppenUponTask = tasks.indexOf(this.task);
    tasks.splice(currentDraggedTaskIndex, 1);
    tasks.splice(indexOfDroppenUponTask, 0, currentDraggedTask);
    renderHTML();
}

function dragStartHandler(event) {
    // this function will be called from task, to "this" is the current dragged task div.
    let indexOfDraggedTask = tasks.indexOf(this.task);
    event.dataTransfer.setData(CURRENT_DRAGGABLE_TASK_DATA_KEY, indexOfDraggedTask)
}

function createTask(text = "", done = false) {
    let eventHandlers = {
        "onUpdate": saveLocalStorage,
        "onDelete": removeTask,
        "onDone": moveToBotton,
        "onUnDone": moveToTop,
        "onDragStart": dragStartHandler,
        "onDrop": drop,
    };
    let newTask = new htmlTask(text, done, eventHandlers);
    return newTask;
}

window.addEmptyTask = () => {
    let task = createTask();
    tasks.push(task);
    content.insertBefore(task.div, content.firstChild);
    saveLocalStorage();
}

window.removeAllDoneTasks = () => {
    tasks = tasks.filter(task => !task.done);
    renderHTML();
}

window.removeAllTasks = () => {
    tasks = [];
    renderHTML();
}

function loadFromLocalStorage() {
    let states = JSON.parse(localStorage.getItem(CURRENT_STATE_SOTRAGE_KEY));
    states.forEach(state => {
        let task = createTask(state.text, state.done);;
        tasks.push(task);
    });
    renderHTML();
}

export function saveLocalStorage() {
    let states = tasks.map((task) => task.getState());
    localStorage.setItem(CURRENT_STATE_SOTRAGE_KEY, JSON.stringify(states));
}

function renderHTML() {
    let childrenClone = [...content.children]
    childrenClone.forEach(item => { item.remove() });
    tasks.forEach(task => {
        content.appendChild(task.div);
    });
    saveLocalStorage();
};

function removeTask(task) {
    let index = tasks.indexOf(task);
    tasks.splice(index, 1);
    renderHTML();
}

function moveToBotton(task) {
    let index = tasks.indexOf(task);
    tasks.splice(index, 1);
    tasks.push(task);
    renderHTML();
}

function moveToTop(task) {
    let index = tasks.indexOf(task);
    tasks.splice(index, 1);
    tasks.splice(0, 0, task);
    renderHTML();
}
