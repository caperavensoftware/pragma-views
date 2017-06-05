import {bindable, inject, customAttribute, DOM} from 'aurelia-framework';
import {InputListener, inputEventType} from './../lib/input-listener';
import {DragManager} from './../lib/drag-manager';
import {inBounds} from './../lib/canvas-helpers';

@customAttribute('sortable')
@inject(DOM.Element, InputListener, DragManager)
export class Sortable {
    /**
     * What css query must pass so that we know what element to use as the drag handel
     */
    @bindable query;

    /**
     * We need to work with the children in array form. This contains the li elements in array form
     */
    childCollection;

    /**
     * backup of element being dragged
     */
    elementBeingDragged;

    /**
     * The dimentions of the UL
     */
    listBounds;

    /**
     * What was the last target you draged over?
     */
    lastTarget;

    /**
     * @constructor
     * @param element
     * @param inputListener
     */
    constructor(element, inputListener, dragManager) {
        this.element = element;

        if (this.element.tagName !== "UL") {
            throw new Error("sortable must be defined on a unordered list");
        }

        if (!this.element.id) {
            this.element.id = this.fabricate(1);
        }

        this.inputListener = inputListener;
        this.dragManager = dragManager;
        this.dragManager.lockX = true;
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
        this.childCollection = Array.from(this.element.childNodes);
        for(let child of this.childCollection) {
            if (child.setAttribute) {
                child.setAttribute("aria-grabbed", "false");
            }
        }

        requestAnimationFrame(_ => this.listBounds = this.element.getBoundingClientRect());

        this.dragHandler = this.drag.bind(this);
        this.dropHandler = this.drop.bind(this);
        this.moveHandler = this.move.bind(this);

        document.id = "document";
        this.inputListener.addEvent(this.element, inputEventType.drag, this.dragHandler);
        this.inputListener.addEvent(document, inputEventType.move, this.moveHandler);
        this.inputListener.addEvent(document, inputEventType.drop, this.dropHandler);
    }

    /**
     * Aurelia lifecycle event
     */
    detached() {
        this.childCollection = null;

        this.inputListener.removeEvent(this.element, inputEventType.drag);
        this.inputListener.removeEvent(document, inputEventType.move);
        this.inputListener.removeEvent(document, inputEventType.drop);

        this.dragHandler = null;
        this.dropHandler = null;
        this.moveHandler = null;
        this.lastTarget = null;

        this.removePlaceholder();
    }

    /**
     * Start draging process
     * @param event
     * @returns {*|Function}
     */
    drag(event) {
        const canDrag = event.target.matches(this.query);

        if (canDrag) {
            const li = this.findParentLi(event.target);
            const dimentions = li.getBoundingClientRect();
            this.dragManager.startDrag(li, dimentions);
            this.addPlaceholder(li);
            this.lastTarget = event.target;
        }

        return canDrag;
    }

    move(event) {
        if (!this.inputListener.currentDraggedElement) {
            return;
        }

        const x = event.clientX ? event.clientX : event.touches[0].clientX;
        const y = event.clientY ? event.clientY : event.touches ? event.touches[0].clientY : 0;

        this.dragManager.move(x, y);

        this.processTarget(event.target);
    }

    processTarget(target) {
        const li = this.findParentLi(target);

        if (li !== this.lastTarget) {
            this.lastTarget = li;
            console.log(li);
        }
    }

    /**
     * Perfom drop operation
     * @param event
     */
    drop(event) {
        this.dragManager.drop();
        this.removePlaceholder();
        this.lastTarget = null;
    }

    /**
     * The item that has to be dragged is the li element, so find that element
     * @param element
     */
    findParentLi(element) {
        if (!element) {
            return null;
        }

        if (element.tagName == "LI") {
            return element;
        }

        if (element == this.element || element == this.dragManager.animationLayer) {
            return null;
        }

        return this.findParentLi(element.parentElement);
    }

    /**
     * Add the placeholder element
     * @param target
     */
    addPlaceholder(target) {
        this.placeholder = document.createElement("DIV");
        this.placeholder.classList.add("place-holder");

        requestAnimationFrame(_ => {
            const dimentions = target.getBoundingClientRect();
            this.placeholder.style.setProperty("--width", dimentions.width);
            this.placeholder.style.setProperty("--height", dimentions.height);
            this.elementBeingDragged = target;

            const targetIndex = this.childCollection.indexOf(target);
            this.childCollection[targetIndex] = this.placeholder;
            this.element.replaceChild(this.placeholder, target);
        });
    }

    /**
     * Remove the current placholder element and put back the element being dragged
     */
    removePlaceholder() {
        if (!this.placeholder) {
            return;
        }

        this.element.replaceChild(this.elementBeingDragged, this.placeholder);
        this.placeholder = null;
        this.elementBeingDragged = null;
    }
}