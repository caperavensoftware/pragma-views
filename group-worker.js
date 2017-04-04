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

        const result = new GroupRow(0, "group", "root", new Aggregate(aggegateOptions.aggregate, aggegateOptions.field));

        let rowIndex = 0;
        for (let row of dataCopy) {
            this.processRowForField(0, fieldsToGroup, result, row, rowIndex, aggegateOptions);
            rowIndex ++;
        }

console.log(result);

        return null;
    }

    processRowForField(fieldIndex, fieldsToGroup, groupRow, row, rowIndex, aggegateOptions) {
        if (fieldIndex > fieldsToGroup.length -1) {
            groupRow.children.set(rowIndex, new GroupRow(rowIndex, "data", null, row));
        }
        else
        {
            const field = fieldsToGroup[fieldIndex];
            const value = row[field];

            if (groupRow.children.has(value)) {
                const childRow = groupRow.children.get(value);
                this.processRowForField(fieldIndex + 1, fieldsToGroup, childRow, row, rowIndex, aggegateOptions)
            }
            else {
                groupRow.children.set(value, new GroupRow(fieldIndex, "group", value, new Aggregate(aggegateOptions.aggregate, aggegateOptions.field)));
            }
        }
    }
}

class GroupRow {
    constructor(id, type, title, model) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.model = model;

        if (type === "group") {
            this.children = new Map();
        }
    }
}

class Aggregate {
    constructor(title, aggregateType, field) {
        this.aggregateType = aggregateType;
        this.field = field;
    }
}

const groupWorker = new GroupWorker();

onmessage = function(event) {
    groupWorker.onMessage(event.data);
};