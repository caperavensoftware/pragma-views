import {customElement, inject, bindable} from 'aurelia-framework';

@customElement('pragma-options-toolbar')
@inject(Element)
export class PragmaOptionsToolbar {
    @bindable dropdownItems;
    @bindable selectedId;

    constructor(element) {
        this.element = element;
    }
}