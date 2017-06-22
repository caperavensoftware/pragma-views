import {customElement, inject} from 'aurelia-framework';

@customElement('pragma-list')
@inject(Element)
export class PragmaList {
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