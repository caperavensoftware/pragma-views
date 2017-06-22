import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Layout {
    @bindable items;

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
    }

    attached() {
        // initialize
        this.items = [];

        for (let i = 0; i < 1000; i++) {
            this.items.push({
                id: i,
                title: `Item ${i}`
            });
        };
    }

    detached() {
        // dispose
    }
}