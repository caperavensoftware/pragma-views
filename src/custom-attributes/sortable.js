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

    get isValidDragTarget() {
        return this._validDragTarget;
    };

    set isValidDragTarget(value) {
        this._validDragTarget = value;
        this.validDragTargetChanged();
    }

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
        this.moveAnimationLayerHandler = this.moveAnimationLayer.bind(this);

        this.inputListener.addEvent(this.element, inputEventType.drag, this.dragHandler);
        this.inputListener.addEvent(this.element, inputEventType.drop, this.dropHandler);
        this.inputListener.addEvent(this.dragManager.animationLayer, inputEventType.move, this.moveAnimationLayerHandler);
        this.inputListener.addEvent(this.dragManager.animationLayer, inputEventType.drop, this.dropHandler);
    }

    /**
     * Aurelia lifecycle event
     */
    detached() {
        this.childCollection = null;

        this.inputListener.removeEvent(this.element, inputEventType.drag);
        this.inputListener.removeEvent(this.element, inputEventType.drop);
        this.inputListener.removeEvent(this.element, inputEventType.move);
        this.inputListener.removeEvent(this.dragManager.animationLayer, inputEventType.move);
        this.inputListener.removeEvent(this.dragManager.animationLayer, inputEventType.drop);

        this.dragHandler = null;
        this.dropHandler = null;
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
            this.dragManager.startDrag(li);
            this.addPlaceholder(li);
            this.isValidDragTarget = true;
            this.lastTarget = event.target;
        }

        return canDrag;
    }

    moveAnimationLayer(event) {
        if (!this.inputListener.currentDraggedElement) {
            return;
        }

        const x = event.clientX ? event.clientX : event.touches[0].clientX;
        const y = event.clientY ? event.clientY : event.touches ? event.touches[0].clientY : 0;

        this.dragManager.move(x, y);
    }

    validDragTargetChanged() {
        if(this.isValidDragTarget == null || this.isValidDragTarget == true) {
            if (document.body.classList.contains("invalid-target")) {
                document.body.classList.remove("invalid-target");
            }
        }
        else {
            if (!document.body.classList.contains("invalid-target")) {
                document.body.classList.add("invalid-target");
            }
        }
    }

    /**
     * Perfom drop operation
     * @param event
     */
    drop(event) {
        this.isValidDragTarget = null;

        this.dragManager.drop();
        this.removePlaceholder();

        if (this.isValidDragTarget) {
            this.lastTarget = null;
        }
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