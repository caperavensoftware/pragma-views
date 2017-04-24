import {customElement, inject} from 'aurelia-framework';

@customElement('pragma-grid')
@inject(Element)
export class PragmaGrid {
    constructor(element) {
        this.element = element;

        // define handlers
        // this.actionHandler = this.action.bind(this);
    }

    attached() {
        // initialize
    }

    detached() {
        // dispose
    }
}