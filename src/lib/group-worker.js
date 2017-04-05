export const aggregates = {
    sum: "sum",
    min: "min",
    max: "max",
    ave: "ave",
    count: "count"
};

export class GroupWorker {
    constructor() {
        this.workerMessageHandler = this.workerMessage.bind(this);

        this.worker = new Worker('group-worker.js');
        this.worker.addEventListener('message', this.workerMessageHandler);
    }

    workerMessage(args) {
        // process callback here
    }

    createCache(id, data) {
        this.worker.postMessage({
            msg: "createCache",
            id: id,
            data: data
        });
    }

    createGroupPerspective(id, perspectiveId, fieldsToGroup, aggegateOptions) {
        this.worker.postMessage({
            msg: "createGroupPerspective",
            id: id,
            perspectiveId: perspectiveId,
            fieldsToGroup: fieldsToGroup,
            aggegateOptions: aggegateOptions
        })
    }
}