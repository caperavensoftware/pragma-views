import {customElement, inject} from 'aurelia-framework';

@customElement('pragma-options-toolbar')
@inject(Element)
export class PragmaOptionsToolbar {
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