export const aggregates = {
    sum: "sum",
    min: "min",
    max: "max",
    ave: "ave",
    count: "count"
};

export class GroupWorker {
    constructor() {
        this.worker = new Worker('group-worker.js');
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
