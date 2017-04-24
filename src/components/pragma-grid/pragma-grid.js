import {customElement, inject, bindable} from 'aurelia-framework';

@customElement('pragma-grid')
@inject(Element)
export class PragmaGrid {
    @bindable columns;
    @bindable perspective;

    constructor(element) {
        this.element = element;
        this.columns = [];
    }

    attached() {
    }

    detached() {
        this.columns = null;
    }
}

export class GridColumn {
    title;
    width;
    background;
}