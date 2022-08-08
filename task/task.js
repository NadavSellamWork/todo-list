export class Task {
    constructor(text = "", done = false, eventHandlers) {
        let eventHandlersToAssign = {
            "onUpdate": eventHandlers.onUpdate,
            "onDelete": eventHandlers.onDelete,
            "onDone": eventHandlers.onDone,
            "onUnDone": eventHandlers.onUnDone,
        };
        Object.assign(this, eventHandlersToAssign);
        this.done = done;
        this.text = text;

        this.onDelete = () => { onDelete.bind(this, this) };
        this.onDone = () => { onDone(this) };
        this.onUnDone = () => { onUnDone(this) };
    }

    getState() {
        return { text: this.text, done: this.done }
    };

    setState(state) {
        this.text = state.text;
        this.done = state.done;
        this.onUpdate();
    };

    changeTaskDoneMark() {
        this.done = !this.done;
        if (this.done) {
            this.onDone();
        } else {
            this.onUnDone();
        }
        this.onUpdate();
    };

    deleteTask() {
        this.onDelete();
        this.onUpdate();
    };

    setText(text) {
        this.text = text;
        this.onUpdate();
    }
}
