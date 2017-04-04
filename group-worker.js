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

        const root = {
            level: 0,
            title: "root",
            items: dataCopy
        };

        this.groupRecursive(root, fieldsToGroup);
    }

    groupRecursive(group, fieldsToGroup) {
        if (group.level > fieldsToGroup.length -1) {
            return;
        }

        group.groups = this.group(group.items, fieldsToGroup[group.level], group.level + 1);

        const keys = group.groups.keys();

        for(let key of keys) {
            const childGroup = group.groups.get(key);
            this.groupRecursive(childGroup, fieldsToGroup);
        }

        group.items = Array.from(group.groups, items => items[1]);
        delete group.groups;
    }

    group(array, fieldName, level) {
        return array.reduce((groupMap, curr) => {
            const key = curr[fieldName];

            if (groupMap.has(key)) {
                groupMap.get(key).items.push(curr);
            }
            else {
                groupMap.set(key, {
                    level: level,
                    title: key,
                    items: [curr]
                })
            }

            return groupMap;
        }, new Map())
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