import {bindable, inject, customAttribute, DOM} from 'aurelia-framework';
import {InputListener, inputEventType} from './../lib/input-listener';

@customAttribute('sortable')
@inject(DOM.Element, InputListener)
export class Sortable {
    @bindable query;
    childCollection;

    /**
     * @constructor
     * @param element
     * @param inputListener
     */
    constructor(element, inputListener) {
        this.element = element;

        if (this.element.tagName !== "UL") {
            throw new Error("sortable must be defined on a unordered list");
        }

        if (!this.element.id) {
            this.element.id = this.fabricate(1);
        }

        this.inputListener = inputListener;
    }

    /**
     * Ensure that the target of the sortable has a id and that the id is unique.
     * This function fabricates a id to be used
     * @param number
     * @returns {*}
     */
    fabricate(number) {
        const id = `sortable-${number}`;
        const element = document.getElementById(id);

        if (element) {
            return this.fabricate(number++);
        }

        return id;
    }

    /**
     * Aurelia lifecycle event
     */
    attached() {
        this.animationLayer = document.getElementById("animation-layer");

        if (!this.animationLayer) {
            this.animationLayer = document.createElement("div");
            this.animationLayer.classList.add("animation-layer");
            this.animationLayer.classList.add("hidden");
            document.body.appendChild(this.animationLayer);
        }

        this.childCollection = Array.from(this.element.childNodes);


        this.clickHandler = this.click.bind(this);
        this.inputListener.addEvent(this.element, inputEventType.click, this.clickHandler);
    }

    /**
     * Aurelia lifecycle event
     */
    detached() {
        this.childCollection = null;
        this.animationLayer = null;

        // don't null inputListener as it is attached through injection
        this.inputListener.removeEvent(this.element, inputEventType.click);
    }

    /**
     * Test click function
     * @param event
     */
    click(event) {
        if (event.target.matches(this.query)) {
            alert("yes");
        }
        else {
            alert("No");
        }
    }
}