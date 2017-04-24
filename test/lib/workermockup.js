class WorkerMockup {
    events;

    constructor() {
        this.events = new Map();
    }

    addEventListener(event, action) {
        this.events.set(event, action);
    }

    postMessage(message) {

    }
}


global.Worker = WorkerMockup;