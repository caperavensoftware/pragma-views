import {customElement, inject, bindable} from 'aurelia-framework';

@customElement('pragma-options-toolbar')
@inject(Element)
export class PragmaOptionsToolbar {
    @bindable dropdownItems;

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