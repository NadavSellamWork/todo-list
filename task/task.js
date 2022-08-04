export class Task {
    constructor(text = "", done = false, onUpdate, onDelete, onDone, onUnDone) {
        this.done = done;
        this.text = text;

        this.onUpdate = onUpdate;
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
