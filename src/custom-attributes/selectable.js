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

        console.log("click changed");
        if (event.target.tagName === "UL") {
            return false;
        }

        this.selectedId = event.target.dataset.id;
    }

    selectedIdChanged()
    {

        console.log("custom changed");

        var newSelectedElement = this.element.querySelectorAll('[data-id="' + this.selectedId + '"]')[0];
        var hold = this.element.querySelectorAll('[data-id="' + this.selectedId + '"]');

        if (this.oldSelectedItem) {
            this.oldSelectedItem.setAttribute("aria-selected", false);
        }

        if(newSelectedElement)
        {
            this.oldSelectedItem = newSelectedElement;
            newSelectedElement.setAttribute("aria-selected", true);
        }
    }
}
