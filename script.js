import { htmlTask } from './task/htmlTask.js';

const CURRENT_STATE_SOTRAGE_KEY = "current-state";
let tasks = [];
let content;

window.onload = () => {
    content = document.getElementById("content");
    loadFromLocalStorage();
}

function createTask(text = "", done = false) {
    return new htmlTask(text, done, saveLocalStorage, removeTask, moveToBotton, moveToTop);
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
