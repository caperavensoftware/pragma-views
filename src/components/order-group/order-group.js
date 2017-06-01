
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

    }
}

