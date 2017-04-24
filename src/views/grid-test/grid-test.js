import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {GroupWorker, aggregates} from './../../lib/group-worker';
import assets from './../../../../data/assets.json!text';

@inject(GroupWorker, EventAggregator)
export class GridTest {
    gridOptions;
    loading;

    constructor(groupWorker, eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.groupWorker = groupWorker;
        this.loading = false;
        this.gridOptions = new GridOptions(null, ["parent_asset_id", "development_status"]);
    }

    attached() {
        this.handleDefaultAssetsHandler = this.handleDefaultAssets.bind(this);
        this.assetsDefaultSubscription =  this.eventAggregator.subscribe("assets_default", this.handleDefaultAssetsHandler);

        this.groupWorker.createCache("assets", JSON.parse(assets).data);
        this.groupWorker.createGroupPerspective("assets", "default", this.gridOptions.groupOrder, { aggregate: aggregates.count });
    }

    handleDefaultAssets(args) {
        console.log(args);
        this.loading = false;
    }

    detached() {
        this.groupWorker.disposeCache("assets");
        this.assetsDefaultSubscription.dispose();
        this.assetsDefaultSubscription = null;
        this.handleDefaultAssetsHandler = null;
    }
}

class GridOptions {
    columns;
    sortOrder;
    groupOrder;

    /**
     * constructor
     * @param sortOrder: array of string, null if none
     * @param groupOrder: array of sring, null if none
     */
    constructor(sortOrder, groupOrder) {
        this.columns = [];
        this.sortOrder = sortOrder;
        this.groupOrder = groupOrder;
    }
}