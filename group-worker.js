class GroupWorker {
    constructor() {
        this.createCacheHandler = this.createCache.bind(this);
        this.createGroupPerspectiveHandler = this.createGroupPerspective.bind(this);
        this.disposeGroupPerspectiveHandler = this.disposeGroupPerspective.bind(this);
        this.disposeCacheHandler = this.disposeCache.bind(this);

        this.functionMap = new Map();
        this.functionMap.set("createCache", this.createCacheHandler);
        this.functionMap.set("createGroupPerspective", this.createGroupPerspectiveHandler);
        this.functionMap.set("disposeGroupPerspective", this.disposeGroupPerspectiveHandler);
        this.functionMap.set("disposeCache", this.disposeCacheHandler);

        this.dataCache = new Map();
    }

    dispose() {
        this.createCacheHandler = null;
        this.createGroupPerspectiveHandler = null;
        this.disposeGroupPerspectiveHandler = null;
        this.disposeCacheHandler = null;

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

    disposeGroupPerspective(args) {
        const id = args.id;
        const perspectiveId = args.perspectiveId;

        if (this.dataCache.has(id)) {
            const cache = this.dataCache.get(id);
            cache.disposePerspective(perspectiveId);
        }
    }

    disposeCache(args) {
        const id = args.id;

        if (this.dataCache.has(id)) {
            const cache = this.dataCache.get(id);
            cache.dispose();

            this.dataCache.delete(id);
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

    /**
     * Remove a perspective from the cache
     * @param perspectiveId
     */
    disposePerspective(perspectiveId) {
        if (this.perspectiveGrouping.has(perspectiveId)) {
            this.perspectiveGrouping.delete(perspectiveId);
        }
    }

    /**
     * Create a perspective and group
     * @param perspectiveId
     * @param fieldsToGroup
     * @param aggegateOptions
     */
    createPerspective(perspectiveId, fieldsToGroup, aggegateOptions) {
        this.perspectiveGrouping.set(perspectiveId, this.createPerspectiveGroup(fieldsToGroup, aggegateOptions))
    }

    /**
     * Create a grouped and aggregated perspective from the data and store it with a key so that I can access it at any time from other views
     * More than one view can use the same perspective, a example of tha is the grid on master detail and the group chart on the list
     * @param fieldsToGroup: what fields are used in this grouping to define the perspective
     * @param aggegateOptions: what are the calculations that need to be made on the group
     */
    createPerspectiveGroup(fieldsToGroup, aggegateOptions) {
        const dataCopy = this.data.slice(0);

        const root = {
            level: 0,
            title: "root",
            items: dataCopy
        };

        this.groupRecursive(root, fieldsToGroup, aggegateOptions);

        console.log(JSON.stringify(root, null, 4));
    }

    /**
     * Recursivly group items of a group oject grouping it according to level and the field defined for that level.
     * @param group: the group to process
     * @param fieldsToGroup: what are the fields to use while grouping
     * @param aggegateOptions: what aggregate calculations should be used
     */
    groupRecursive(group, fieldsToGroup, aggegateOptions) {
        if (group.level > fieldsToGroup.length -1) {
            group.aggregate = {
                aggregate: aggegateOptions.aggregate,
                value: aggregator[aggegateOptions.aggregate](group.items, aggegateOptions.field)
            };
            return;
        }

        group.groups = this.group(group.items, fieldsToGroup[group.level], group.level + 1);

        const keys = group.groups.keys();

        for(let key of keys) {
            const childGroup = group.groups.get(key);
            this.groupRecursive(childGroup, fieldsToGroup, aggegateOptions);
        }

        group.aggregate = {
            aggregate: aggegateOptions.aggregate,
            value: aggregator[aggegateOptions.aggregate](group.items, aggegateOptions.field)
        };

        group.items = Array.from(group.groups, items => items[1]);
        delete group.groups;
    }

    /**
     * Create a
     * @param array
     * @param fieldName
     * @param level
     * @returns {any|*}
     */
    group(array, fieldName, level) {
        return array.reduce((groupMap, curr) => {
            const key = curr[fieldName];

            if (groupMap.has(key)) {
                groupMap.get(key).items.push(curr);
            }
            else {
                groupMap.set(key, {
                    level: level,
                    field: fieldName,
                    title: key,
                    items: [curr]
                })
            }

            return groupMap;
        }, new Map())
    }
}

const aggregator = {
    count(items) {
        return items.length;
    },

    sum(items, field) {
        let result = 0;

        for(let item of items) {
            result += item[field];
        }

        return result;
    },

    min(items, field) {
        let result = items[0][field];

        for(let item of items) {
            if (item[field] < result) {
                result = item[field];
            }
        }

        return result;
    },

    max(items, field) {
        let result = items[0][field];

        for(let item of items) {
            if (item[field] > result) {
                result = item[field];
            }
        }

        return result;
    },

    ave(items, field) {
        let result = this.sum(items, field);

        result = result / items.length;

        return result;
    }
};


const groupWorker = new GroupWorker();

onmessage = function(event) {
    groupWorker.onMessage(event.data);
};