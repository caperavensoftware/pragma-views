
import {bindable, customElement, inject} from 'aurelia-framework';
     
@customElement('order-group')
@inject(Element)
export class OrderGroup {
    element;
    @bindable items;
    @bindable sortableQuery;

    constructor(element) {
        this.element = element;
        this.sortableQuery = 'icon[name="sorting"]'
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

