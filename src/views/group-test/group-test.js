import {inject} from 'aurelia-framework';
import {GroupWorker, aggregates} from './../../lib/group-worker';
import {EventAggregator} from 'aurelia-event-aggregator';

// import assets from './../../../../data/assets.json!text';

@inject(GroupWorker, EventAggregator)
export class GroupTest {
    constructor(groupWorker, eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.groupWorker = groupWorker;
        this.updateCollection();
    }

    attached() {
        this.handleDefaultAssetsHandler = this.handleDefaultAssets.bind(this);
        this.assetsDefaultSubscription =  this.eventAggregator.subscribe("assets_default", this.handleDefaultAssetsHandler);

        this.groupWorker.createCache("assets", this.collection);
        this.groupWorker.createGroupPerspective("assets", "default", ["isActive", "location", "site"], { aggregate: aggregates.count });
        this.groupWorker.createGroupPerspective("assets", "location-cost", ["location"], { aggregate: aggregates.sum, field: "cost" });
        this.groupWorker.createGroupPerspective("assets", "isActive-cost-ave", ["isActive"], { aggregate: aggregates.min, field: "cost" });
        this.groupWorker.createGroupPerspective("assets", "isActive-cost-max", ["isActive"], { aggregate: aggregates.max, field: "cost" });
        this.groupWorker.createGroupPerspective("assets", "site-cost", ["site"], { aggregate: aggregates.ave, field: "cost" });

        this.groupWorker.disposeGroupPerspective("assets", "site-cost");
        this.groupWorker.disposeGroupPerspective("assets", "isActive-cost-max");
        this.groupWorker.disposeGroupPerspective("assets", "isActive-cost-ave");
        this.groupWorker.disposeGroupPerspective("assets", "location-cost");

        this.groupWorker.disposeCache("assets");
    }

    detached() {
        this.groupWorker.disposeCache("assets");
        this.assetsDefaultSubscription.dispose();
    }

    handleDefaultAssets(args) {
        console.log(args);
    }

    updateCollection() {
        this.collection = [
            {
                id: 1,
                code: "A",
                site: "A11",
                isActive: true,
                location: "capetown",
                cost: 10
            },
            {
                id: 2,
                code: "B",
                site: "A11",
                isActive: false,
                location: "capetown",
                cost: 11
            },
            {
                id: 3,
                code: "C",
                site: "A12",
                isActive: true,
                location: "capetown",
                cost: 12
            },
            {
                id: 4,
                code: "D",
                site: "A11",
                isActive: true,
                location: "capetown",
                cost: 13
            },
            {
                id: 5,
                code: "E",
                site: "B12",
                isActive: true,
                location: "johannesburg",
                cost: 14
            },
            {
                id: 6,
                code: "F",
                site: "A11",
                isActive: true,
                location: "capetown",
                cost: 15
            },
            {
                id: 7,
                code: "G",
                site: "A11",
                isActive: false,
                location: "capetown",
                cost: 16
            },
            {
                id: 8,
                code: "H",
                site: "A12",
                isActive: false,
                location: "capetown",
                cost: 17
            },
            {
                id: 9,
                code: "I",
                site: "B11",
                isActive: true,
                location: "johannesburg",
                cost: 18
            },
            {
                id: 10,
                code: "J",
                site: "B11",
                isActive: true,
                location: "johannesburg",
                cost: 19
            },

        ]
    }
}