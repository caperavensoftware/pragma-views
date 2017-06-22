import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import assets from './../../../../data/assets.json!text';
import {GridColumn} from './../../components/pragma-grid/pragma-grid';

@inject(EventAggregator)
export class GridTest {
    @bindable columns;
    @bindable items;

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
    }

    attached() {

    }


    detached() {

    }
}