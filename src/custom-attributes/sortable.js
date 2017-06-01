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
        for(let child of this.childCollection) {
            if (child.setAttribute) {
                child.setAttribute("aria-grabbed", "false");
            }
        }

        this.dragHandler = this.drag.bind(this);
        this.dropHandler = this.drop.bind(this);
        this.moveHandler = this.move.bind(this);

        this.inputListener.addEvent(this.element, inputEventType.drag, this.dragHandler);
        this.inputListener.addEvent(this.element, inputEventType.drop, this.dropHandler);
        this.inputListener.addEvent(this.element, inputEventType.move, this.moveHandler);
    }

    /**
     * Aurelia lifecycle event
     */
    detached() {
        this.childCollection = null;
        this.animationLayer = null;

        this.inputListener.removeEvent(this.element, inputEventType.drag);
        this.inputListener.removeEvent(this.element, inputEventType.drop);
        this.inputListener.removeEvent(this.element, inputEventType.move);

        this.dragHandler = null;
        this.dropHandler = null;
    }

    drag(event) {
        return event.target.matches(this.query);
    }

    drop(event) {
        const dropTarget = event.target;
        const dropSource = this.inputListener.currentDraggedElement;

        console.log("dropSource");
        console.log(dropSource);

        console.log("dropTarget");
        console.log(dropTarget);
    }

    move(event) {
        console.log(`${event.clientX} ${event.clientY}`);
    }
}