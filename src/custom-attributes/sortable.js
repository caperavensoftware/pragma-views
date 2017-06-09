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
    @bindable datasource;

    dsBackup;

    /**
     * We need to work with the children in array form. This contains the li elements in array form
     */
    childCollection;

    /**
     * backup of element being dragged
     */
    elementBeingDragged;

    /**
     * What was the last target you draged over?
     */
    lastTarget;

    datasourceChanged() {
        this.dsBackup = this.datasource.slice(0);
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
        this.dragManager.lockX = false;
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
        this.mobileMoveHandler = this.mobileMove.bind(this);

        document.id = "document";
        this.inputListener.addEvent(this.element, inputEventType.drag, this.dragHandler);
        this.inputListener.addEvent(this.element, inputEventType.move, this.inputListener.isMobile ? this.mobileMoveHandler : this.moveHandler, true);
        this.inputListener.addEvent(this.element, inputEventType.drop, this.dropHandler);
    }

    /**
     * Aurelia lifecycle event
     */
    detached() {
        this.childCollection = null;

        this.inputListener.removeEvent(this.element, inputEventType.drag);
        this.inputListener.removeEvent(this.element, inputEventType.move);
        this.inputListener.removeEvent(this.element, inputEventType.drop);

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

            this.dragManager.startDrag(li).then(_ => {
                this.addPlaceholder(li);
                this.lastTarget = event.target;
            })
        }

        return canDrag;
    }

    move(event) {
        if (this.isBusyAnimating) {
            return;
        }

        const x = event.clientX;
        const y = event.clientY;
        this.performMove(x, y, event.target);
    }

    mobileMove(event) {
        if (this.isBusyAnimating) {
            return;
        }

        const x = event.touches[0].clientX;
        const y = event.touches[0].clientY;
        const target = document.elementFromPoint(x, y);

        this.performMove(x, y, target);

        return true;
    }

    performMove(x, y, element) {
        this.dragManager.move(x, y);
        this.processTarget(element);
    }

    processTarget(target) {
        if (this.isBusyAnimating || target.classList.contains("place-holder") || !this.itemDimentions) {
            return;
        }

        const li = this.findParentLi(target);

        if (li && li !== this.lastTarget) {
            this.lastTarget = li;

            const index = this.childCollection.indexOf(li);

            let top = this.itemDimentions.height * (index > this.placeholderIndex ? -1 : 1);
            const duration = 100;
            li.classList.add("moving");
            li.style.setProperty("--duration", duration);
            li.style.setProperty("--top", top);

            this.isBusyAnimating = true;

            const interval = setInterval(_ => {
                clearInterval(interval);

                if (index != this.placeholderIndex) {
                    this.swap(li, index).then(_ => {
                        this.isBusyAnimating = false;
                    });
                }
            }, duration);
        }
    }

    swap(target, index) {
        return new Promise(resolve => {
            if (this.placeholderIndex < index) {
                this.element.insertBefore(target, this.placeholder);
            }
            else {
                this.element.insertBefore(this.placeholder, target);
            }

            this.childCollection.splice(this.placeholderIndex, 1);
            this.childCollection.splice(index, 0, this.placeholder);

            const dsBackup = this.dsBackup[this.placeholderIndex];
            this.dsBackup.splice(this.placeholderIndex, 1);
            this.dsBackup.splice(index, 0, dsBackup);

            target.classList.remove("moving");
            this.placeholderIndex = index;
            this.lastTarget = null;

            resolve();
        })
    }

    /**
     * Perfom drop operation
     * @param event
     */
    drop(event) {
        this.dragManager.drop();
        this.removePlaceholder();
        this.lastTarget = null;
        this.childCollection = Array.from(this.element.childNodes);
        this.datasource = this.dsBackup;
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
        this.placeholderIndex = this.childCollection.indexOf(target);
        this.placeholder = document.createElement("DIV");
        this.placeholder.classList.add("place-holder");

        requestAnimationFrame(_ => {
            this.itemDimentions = target.getBoundingClientRect();
            this.placeholder.style.setProperty("--width", this.itemDimentions.width);
            this.placeholder.style.setProperty("--height", this.itemDimentions.height);
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
        if (!this.placeholder || !this.elementBeingDragged) {
            return;
        }

        this.element.replaceChild(this.elementBeingDragged, this.placeholder);
        this.childCollection[this.placeholderIndex] = this.elementBeingDragged;
        this.placeholder = null;
        this.elementBeingDragged = null;
        this.itemDimentions = null;
        this.placeholderIndex = null;
    }
}