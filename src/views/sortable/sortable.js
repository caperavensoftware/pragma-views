import {bindable} from 'aurelia-framework';

export class Sortable {
    @bindable items;
    @bindable templateHtml;

    constructor() {
        this.items = [];
        for (let i = 0; i < 1000; i++) {
            this.items.push({
                text: `Item number ${i}`
            });
        }

        this.templateHtml = '<div class="card default-padding">${text}</div>'
    }
}
