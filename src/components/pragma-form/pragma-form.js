import {customElement, inject} from 'aurelia-framework';

@customElement('pragma-form')
@inject(Element)
export class PragmaForm {
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