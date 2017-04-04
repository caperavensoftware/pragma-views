class GroupWorker {
    constructor() {
        this.createCacheHandler = this.createCache.bind(this);
        this.createGroupPerspectiveHandler = this.createGroupPerspective.bind(this);

        this.functionMap = new Map();
        this.functionMap.set("createCache", this.createCacheHandler);
        this.functionMap.set("createGroupPerspective", this.createGroupPerspectiveHandler);

        this.dataCache = new Map();
    }

    dispose() {
        this.createCacheHandler = null;

        this.functionMap.clear();
        this.functionMap = null;
    }

    onMessage(args) {
        if (this.functionMap.has(args.msg)) {
            this.functionMap.get(args.msg)(args);
        }
    }

    createCache(args) {
        if (this.dataCache.has(args.id)) {
            const dataCache = ths.dataCache.get(id);
            dataCache.data = args.data;
            dataCache.updateAllPerspectives();
        }
        else {
            this.dataCache.set(args.id, new DataCache(args.data));
        }
    }

    createGroupPerspective(args) {
        const id = args.id;
        const perspectiveId = args.perspectiveId;
        const fieldsToGroup = args.fieldsToGroup;
        const aggegateOptions = args.aggegateOptions;

        const dataCache = this.dataCache.get(id);
        if (dataCache) {
            dataCache.createPerspective(perspectiveId, fieldsToGroup, aggegateOptions);
        }
    }
}

class DataCache {
    constructor(data) {
        this.data = data;
        this.perspectiveGrouping = new Map()
    }

    dispose() {
        this.data = null;
        this.perspectiveGrouping.clear();
        this.perspectiveGrouping = null;
    }

    // process all perspectives again
    updateAllPerspectives() {

    }

    createPerspective(perspectiveId, fieldsToGroup, aggegateOptions) {
        this.perspectiveGrouping.set(perspectiveId, this.createPerspectiveGroup(fieldsToGroup, aggegateOptions))
    }

    createPerspectiveGroup(fieldsToGroup, aggegateOptions) {
        const dataCopy = this.data.splice(0);

        for (let field of fieldsToGroup) {
            console.log(field);
        }

        return null;
    }
}

const groupWorker = new GroupWorker();

onmessage = function(event) {
    groupWorker.onMessage(event.data);
};