import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {GroupWorker, aggregates} from './../../lib/group-worker';
import assets from './../../../../data/assets.json!text';
import {GridColumn} from './../../components/pragma-grid/pragma-grid';

@inject(GroupWorker, EventAggregator)
export class GridTest {
    @bindable columns;
    @bindable items;

    gridOptions;
    loading;
    columns;

    constructor(groupWorker, eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.groupWorker = groupWorker;
        this.loading = false;
        this.gridOptions = new GridOptions(null, ["asset_type_id", "last_confirmed_on"]);

        this.columns = [
            new GridColumn("code", "Code", 100, null),
            new GridColumn("description", "Description", 200, null),
            new GridColumn("development_status", "Development Status", 100, null),
            new GridColumn("last_confirmed_on", "Last Confirmed On", 100, null)
        ]
    }

    attached() {
        this.handleDefaultAssetsHandler = this.handleDefaultAssets.bind(this);
        this.assetsDefaultSubscription =  this.eventAggregator.subscribe("assets_default", this.handleDefaultAssetsHandler);

        this.groupWorker.createCache("assets", JSON.parse(assets).data);
        this.groupWorker.createGroupPerspective("assets", "default", this.gridOptions.groupOrder, { aggregate: aggregates.count });
    }

    handleDefaultAssets(args) {
        this.loading = false;
        this.items = args.items;
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