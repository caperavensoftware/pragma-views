import {bindable, inject, customAttribute, DOM} from 'aurelia-framework';

@customAttribute('sortable')
@inject(DOM.Element)
export class Sortable {
    sortableList;
    childCollection;

    constructor(element) {
        this.element = element;

        if (this.element.tagName !== "UL") {
            throw new Error("sortable must be defined on a unordered list");
        }
    }

    attached() {
        this.animationLayer = document.getElementById("animation-layer");

        if (!this.animationLayer) {
            this.animationLayer = document.createElement("div");
            this.animationLayer.classList.add("animation-layer");
            this.animationLayer.classList.add("hidden");
            document.body.appendChild(this.animationLayer);
        }
    }

    cloneList() {
        this.sortableList = this.element.cloneNode(true);
        this.childCollection = Array.from(this.sortableList.childNodes);
    }

    uncloneList() {
        this.sortableList = null;
        this.childCollection = null;
    }
}