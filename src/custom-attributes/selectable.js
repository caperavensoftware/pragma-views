import {bindable, inject, customAttribute, DOM} from 'aurelia-framework';

@customAttribute('selectable')
@inject(DOM.Element)
export class Selectable {
    @bindable selectedId;
    oldSelectedItem;

    constructor(element) {
        this.element = element;
    }

    attached() {
        this.clickHandler = this.click.bind(this);
        this.element.addEventListener("click", this.clickHandler);
    }

    detached() {
        this.element.removeEventListener("click", this.clickHandler);
        this.clickHandler = null;
    }

    click(event) {
        if (event.target.tagName === "UL") {
            return false;
        }

        this.selectedId = event.target.dataset.id;

        if (this.oldSelectedItem) {
            this.oldSelectedItem.setAttribute("aria-selected", false);
        }

        this.oldSelectedItem = event.target;
        event.target.setAttribute("aria-selected", true);
    }
}
