import { Task } from "./task.js";
const DONE_TASK_TEXT_CLASS = "task-input-text-corssed";
const DONE_TASK_BUTTON_TEXT = '\u{02713}';
const DELETE_TASK_BUTTON_TEXT = "X";

export class htmlTask extends Task {
    constructor(text = "", done = false, {onUpdate, onDelete, onDone, onUnDone,onDragStart,onDrop}) {
        let taskEventHandlers = {
            "onUpdate": onUpdate,
            "onDelete": onDelete,
            "onDone": onDone,
            "onUnDone": onUnDone,
        };
        super(text, done, taskEventHandlers);

        let eventHandlersToAssign = {
            "onDragStart": onDragStart,
            "onDrop": onDrop,
        };
        Object.assign(this, eventHandlersToAssign);

        this.initilizeDiv();

        this.initializeInputBar();

        this.initilizeDeleteButton();

        this.initilizeDoneButton();
    }

    initilizeDiv() {
        this.div = document.createElement('div');
        this.div.classList.add("task");
        this.div.draggable = true;
        this.div.task = this;

        this.div.addEventListener("dragenter", (event) => { event.preventDefault(); });
        this.div.addEventListener("dragover", (event) => { event.preventDefault(); });
        this.div.addEventListener("dragstart", this.onDragStart);
        this.div.addEventListener("drop", this.onDrop);
    }

    initializeInputBar = () => {
        this.inputBar = document.createElement("input");
        this.inputBar.value = this.text;

        if (this.done) {
            this.inputBar.classList.add(DONE_TASK_TEXT_CLASS);
        } else {
            this.inputBar.classList.remove(DONE_TASK_TEXT_CLASS);
        }


        this.inputBar.classList.add("task-input-text");
        this.inputBar.addEventListener("keydown", this.handleKeyDownEvent.bind(this));
        this.div.appendChild(this.inputBar);
    };

    initilizeDeleteButton = () => {
        this.deleteButton = document.createElement("button");
        this.deleteButton.classList.add("delete-button");
        this.deleteButton.textContent = DELETE_TASK_BUTTON_TEXT;
        this.deleteButton.addEventListener("click", this.deleteTask.bind(this));
        this.div.appendChild(this.deleteButton);
    };

    initilizeDoneButton = () => {
        this.doneButton = document.createElement("button");
        this.doneButton.classList.add("finished-button");
        this.doneButton.textContent = DONE_TASK_BUTTON_TEXT;
        this.doneButton.addEventListener("click", this.taskDoneButtonClick.bind(this));
        this.div.appendChild(this.doneButton);
    };

    taskDoneButtonClick = () => {
        this.changeTaskDoneMark();
        if (this.done) {
            this.inputBar.classList.add(DONE_TASK_TEXT_CLASS);
            this.onDone(this);
        } else {
            this.inputBar.classList.remove(DONE_TASK_TEXT_CLASS);
            this.onUnDone(this);
        }
    };

    taskDoneButtonClick = () => {
        this.changeTaskDoneMark();
        if (this.done) {
            this.inputBar.classList.add(DONE_TASK_TEXT_CLASS);
        } else {
            this.inputBar.classList.remove(DONE_TASK_TEXT_CLASS);
        }
    };

    setState(state) {
        super.setState(state);
        this.inputBar.value = this.text;
        if (this.done) {
            this.inputBar.classList.add(DONE_TASK_TEXT_CLASS);
        }
    }

    handleKeyDownEvent(event) {
        switch (event.key) {
            case "Enter":
                this.setText(this.inputBar.value);
                this.inputBar.blur();
                break;

            case "Escape":
                this.inputBar.value = this.text;
                this.inputBar.blur();
                break;
        }
    }
}
