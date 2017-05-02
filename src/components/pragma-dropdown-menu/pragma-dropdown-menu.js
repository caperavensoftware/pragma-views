import {customElement, inject, bindable} from 'aurelia-framework';

@customElement('pragma-dropdown-menu')
@inject(Element)
export class PragmaDropdownMenu {
    @bindable title;
    @bindable iconName;

    constructor(element) {
        this.element = element;
        this.iconName = "";
    }

    attached() {
    }

    detached() {
    }
}