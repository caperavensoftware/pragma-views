import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class GridTest {
    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
    }

    attached() {
        // initialize
    }

    detached() {
        // dispose
    }
}