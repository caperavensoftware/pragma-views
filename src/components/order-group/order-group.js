
import {bindable, customElement, inject} from 'aurelia-framework';
     
@customElement('order-group')
@inject(Element)
export class OrderGroup {
    element;
    @bindable items;
    @bindable templateHtml;

    constructor(element) {
        this.element = element;
        this.templateHtml = [
            `<div class="half-margin-right" class.bind="isOn ? 'active' : 'inactive'">`,
            '    <icon name="sorting" class="drag-handle"></icon>',
            '    <label class="bold stretch">${title}</label>',
            '    <input type="checkbox" checked.bind="isOn" class="switch"/>',
            '</div>',
        ].join("");
    }
    
    attached() {
        const view = document.querySelector("router-view");
        view.style.setProperty("--overflow", "none");
        view.style.setProperty("--overflowWebkit", "none");
    }

    detached() {
        const view = document.querySelector("router-view");
        view.style.setProperty("--overflow", "scroll");
        view.style.setProperty("--overflowWebkit", "touch");
    }
}

