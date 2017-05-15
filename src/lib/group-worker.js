import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

export const aggregates = {
    sum: "sum",
    min: "min",
    max: "max",
    ave: "ave",
    count: "count"
};

@inject(EventAggregator)
export class GroupWorker {
    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;

        this.workerMessageHandler = this.workerMessage.bind(this);

        this.worker = new Worker('group-worker.js');
        this.worker.addEventListener('message', this.workerMessageHandler);
    }

    workerMessage(args) {
        if (this[args.data.msg]) {
            this[args.data.msg].call(this, args.data);
        }
    }

    /**
     * add a data cache for processing to the work manager web worker
     * @param id: cache id used for unique identification of cache
     * @param data: what array of data do you want to cache for further processing on perspectives
     */
    createCache(id, data) {
        this.worker.postMessage({
            msg: "createCache",
            id: id,
            data: data
        });
    }

    /**
     * Given the cache id, create a perspective grouping and aggregation
     * @param id: cache id to get data for processing
     * @param perspectiveId: as what must the perspective be cached on.
     * @param fieldsToGroup: string array of field names to group by during cache processing
     * @param aggegateOptions: aggregation to be used
     */
    createGroupPerspective(id, perspectiveId, fieldsToGroup, aggegateOptions) {
        this.worker.postMessage({
            msg: "createGroupPerspective",
            id: id,
            perspectiveId: perspectiveId,
            fieldsToGroup: fieldsToGroup,
            aggegateOptions: aggegateOptions
        })
    }

    /**
     * remove perspective from cache
     * @param id
     * @param perspectiveId
     */
    disposeGroupPerspective(id, perspectiveId) {
        this.worker.postMessage({
            msg: "disposeGroupPerspective",
            id: id,
            perspectiveId: perspectiveId
        })
    }

    getGroupPerspective(id, perspectiveId) {
        this.worker.postMessage({
            msg: "getGroupPerspective",
            id: id,
            perspectiveId: perspectiveId
        })
    }

    getRecordsFor(id, perspectiveId, filters) {
        this.worker.postMessage({
            msg: "getRecordsFor",
            id: id,
            perspectiveId: perspectiveId,
            filters: filters
        })
    }

    /**
     * remove the cache and all it's perspectives
     * @param id
     */
    disposeCache(id) {
        this.worker.postMessage({
            msg: "disposeCache",
            id: id
        })
    }

    createGroupPerspectiveResponse(args) {
        this.eventAggregator.publish(`${args.id}_${args.perspectiveId}`, args.data);
    }

    getGroupPerspectiveResponse(args) {
        this.eventAggregator.publish(`${args.id}_${args.perspectiveId}`, args.data);
    }

    getRecordsForResponse(args){
        this.eventAggregator.publish(`records_${args.id}`, args.data);
    }
}