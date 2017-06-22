import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class GridTest {
    @bindable columns;
    @bindable items;
    @bindable schema;

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
    }

    attached() {
        this.items = [{
            description: "Please wait while loading a LOT of records"
        }];

        new Promise(resolve => {
            System.import('./../../../../data/assets.json!text').then(assets => {
                this.items = JSON.parse(assets).data.slice(0, 10000);
            })
        })
    }


    detached() {

    }
}