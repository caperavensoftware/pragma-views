import {customElement, bindable, inject} from 'aurelia-framework';
@customElement('assistant')
@inject(Element)
export class Assistant {
    element = null;
    @bindable isOpen;
    
    constructor(element) {
        this.element = element;
    }

    isOpenChanged() {
        if (this.isOpen) {
            this.element.classList.remove("close");
        }
        else
        {
            this.element.classList.add("close");
        }
    }

    close() {
        this.isOpen = false;
    }
}
