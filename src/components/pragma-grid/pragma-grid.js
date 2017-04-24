import {customElement, inject, bindable} from 'aurelia-framework';

@customElement('pragma-grid')
@inject(Element)
export class PragmaGrid {
    @bindable columns;
    @bindable sortOrder;
    @bindable groupOrder;
    @bindable items;

    constructor(element) {
        this.element = element;
        this.columns = [];
        this.sortOrder = [];
        this.groupOrder = [];
    }

    attached() {
        // initialize
    }

    detached() {
        // dispose
        this.columns = null;
        this.sortOrder = null;
        this.groupOrder = null;
        this.items = null;
    }
}

export class GridColumn {
    title;
    width;
    background;
}