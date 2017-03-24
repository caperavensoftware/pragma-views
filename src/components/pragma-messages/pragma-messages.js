
// @flow
import {customElement, useShadowDOM, inject} from 'aurelia-framework';
@customElement('pragma-messages')
@inject(Element)
export class PragmaMessages {
    element = null;
    
    constructor(element) {
        this.element = element;
    }
}
