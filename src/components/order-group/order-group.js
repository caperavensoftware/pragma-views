
import {bindable, customElement, inject} from 'aurelia-framework';
     
@customElement('order-group')
@inject(Element)
export class OrderGroup {
    element;
    @bindable items;

    constructor(element) {
        this.element = element;
    }
    
    attached() {
    }
}

