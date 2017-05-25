import {bindable, customElement, inject} from 'aurelia-framework';

@customElement('group')
@inject(Element)
export class Group {
    @bindable expanded;
    @bindable title;

    constructor(element) {
        this.element = element;
        this.expanded = true;
    }
}