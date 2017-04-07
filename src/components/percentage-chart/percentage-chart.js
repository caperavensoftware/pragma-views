
// @flow
import {customElement, bindable, inject} from 'aurelia-framework';

@customElement('percentage-chart')
@inject(Element)
export class PercentageChart {
    element = null;
    @bindable items;

    constructor(element) {
        this.element = element;
    }

    attached() {
    }
}
