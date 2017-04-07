
// @flow
import {customElement, bindable, inject} from 'aurelia-framework';

@customElement('master-list-container')
@inject(Element)
export class MasterListContainer {
    element = null;
    @bindable items;
    @bindable selectedId;

    constructor(element) {
        this.element = element;
    }

     menuSelected(event) {
         console.log("TEST");
    }

    selectedIdChanged() {
        console.log(this.selectedId);
    }
}
