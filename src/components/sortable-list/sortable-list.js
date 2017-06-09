import {customElement, inject, bindable, ViewCompiler, ViewSlot, Container, ViewResources, TemplatingEngine} from 'aurelia-framework';
import {InputListener, inputEventType} from './../../lib/input-listener';

// /*
//     set the move event when removing item from the view
//  */


@customElement('sortable-list')
@inject(Element, ViewCompiler, Container, ViewResources, TemplatingEngine, InputListener)
export class SortableList {
    listElement;
    @bindable items;
    @bindable html;
    @bindable sort;
    @bindable itemStyle;
    @bindable selectQuery;

    viewFactory;
    animationLayer;
    placeholderIndex;

    constructor(element, viewCompiler, container, viewResources, templatingEngine, inputListener) {
        this.element = element;
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
        this.templatingEngine = templatingEngine;
        this.inputListener = inputListener;
        this.domViewMap = new Map();
    }

    attached() {
        this.createAnimationLayer();

        this.listElement.id = this.fabricateId(0);

        this.setupViews();
        this.setupEvents();
        this.itemsChanged();
    }

    setupViews() {
        let template = `<template><li class="${this.itemStyle}">${this.html}</li></template>`;
        let placeholderTemplate = `<template><div class="place-holder"></div></template>`;

        this.viewFactory = this.viewCompiler.compile(template, this.viewResources);
        this.placeholderFactory = this.viewCompiler.compile(placeholderTemplate, this.viewResources);

        this.viewSlot = new ViewSlot(this.listElement, true);
    }

    setupEvents() {
        this.startDragHandler = this.startDrag.bind(this);
        this.moveHandler = this.move.bind(this);
        this.mobileMoveHandler = this.moveMobile.bind(this);
        this.dropHandler = this.drop.bind(this);

        this.inputListener.addEvent(this.listElement, inputEventType.drag, this.startDragHandler, true);
        this.inputListener.addEvent(this.listElement, inputEventType.move, this.inputListener.isMobile ? this.mobileMoveHandler : this.moveHandler, true);
        this.inputListener.addEvent(this.listElement, inputEventType.drop, this.dropHandler, true);
    }

    detached() {
        this.disposeViews();
        this.disposeEvents();
    }

    disposeViews() {
        this.viewSlot.removeAll(false, true);
        this.viewSlot = null;
        this.viewFactory = null;
        this.domViewMap.clear();
    }

    disposeEvents() {
        this.inputListener.removeEvent(this.listElement, inputEventType.drag);
        this.inputListener.removeEvent(this.listElement, inputEventType.move);
        this.inputListener.removeEvent(this.listElement, inputEventType.drop);

        this.startDragHandler = null;
        this.moveHandler = null;
        this.dropHandler = null;
    }

    createAnimationLayer() {
        this.animationLayer = document.getElementById("animation-layer");

        if (!this.animationLayer) {
            this.animationLayer = document.createElement("div");
            this.animationLayer.id = "animation-layer";
            this.animationLayer.classList.add("animation-layer");
            this.animationLayer.classList.add("hidden");
            document.body.appendChild(this.animationLayer);
        }
    }

    fabricateId(number) {
        const id = `sortable-${number}`;
        const element = document.getElementById(id);

        if (element) {
            return this.fabricateId(number+1);
        }

        return id;
    }

    findParentLi(element) {
        if (!element) {
            return null;
        }

        if (element.tagName == "LI") {
            return element;
        }

        return this.findParentLi(element.parentElement);
    }

    itemsChanged() {
        this.domViewMap.clear();

        if (!this.viewFactory) {
            return;
        }

        if (this.items == null) {
            this.viewSlot.removeAll(false, true);
            return;
        }

        for(let item of this.items) {
            const view = this.viewFactory.create(this.container);
            view.bind(item);
            this.viewSlot.add(view);
            this.domViewMap.set(view.firstChild, view);
        }

        this.viewSlot.attached();
    }

    getEventTarget(event) {
        let x = 0;
        let y = 0;

        if (this.inputListener.isMobile) {
            x = event.touches[0].clientX;
            y = event.touches[0].clientY;
        }
        else {
            x = event.clientX;
            y = event.clientY;
        }

        const topElement = document.elementFromPoint(x, y);

        if (this.selectQuery && !topElement.matches(this.selectQuery)) {
            return null;
        }

        return this.findParentLi(topElement);
    }

    startDrag(event) {
        if (!this.sort || this.elementBeingMoved) {
            return false;
        }

        this.elementBeingMoved = this.getEventTarget(event);

        // clicked on empty space
        if (!this.elementBeingMoved) {
            return false;
        }

        this.clone = this.elementBeingMoved.cloneNode(true);

        if (this.clone) {
            requestAnimationFrame(_ => {
                this.itemDimentions = this.elementBeingMoved.getBoundingClientRect();
                this.createDragClone(this.itemDimentions);
                this.setPlaceholder(this.itemDimentions);
            });
        }
    }

    setPlaceholder(rect) {
        this.placeholder = this.placeholderFactory.create(this.container);
        this.placeholder.firstChild.style.setProperty("--width", rect.width);
        this.placeholder.firstChild.style.setProperty("--height", rect.height);

        const view = this.domViewMap.get(this.elementBeingMoved);

        this.placeholderIndex = this.viewSlot.children.indexOf(view);
        this.viewSlot.insert(this.placeholderIndex, this.placeholder);
        this.viewSlot.remove(view, false, true);
    }

    createDragClone(rect) {
        this.clone.classList.add("clone");
        this.clone.style.setProperty("--x", rect.left);
        this.clone.style.setProperty("--y", rect.top);
        this.clone.style.setProperty("--width", rect.width);
        this.clone.style.setProperty("--height", rect.height);

        this.animationLayer.appendChild(this.clone);
        this.animationLayer.classList.remove("hidden");
    }

    move(event) {
        const x = event.clientX;
        const y = event.clientY;

        this.performMove(x, y);
        return true;
    }

    moveMobile(event) {
        const x = event.touches[0].clientX;
        const y = event.touches[0].clientY;

        this.performMove(0, y);
        return true;
    }

    performMove(x, y) {
        this.clone.style.setProperty("--x", x);
        this.clone.style.setProperty("--y", y);

        this.swap(x, y);
    }

    swap(x, y) {
        return new Promise(resolve => {
            const topElement = document.elementFromPoint(x, y);
            const topLi = this.findParentLi(topElement);

            if (this.lastSelectedLi == topLi) {
                return resolve();
            }

            if (!topLi) {
                return resolve();
            }

            const targetView = this.domViewMap.get(topLi);
            const targetIndex = this.viewSlot.children.indexOf(targetView);
            const top = this.itemDimentions.height * (targetIndex > this.placeholderIndex ? -1 : 1);

            const duration = 100;
            topLi.classList.add("moving");
            topLi.style.setProperty("--duration", duration);
            topLi.style.setProperty("--top", top);

            this.lastSelectedLi = topLi;

            const interval = setInterval(_ => {
                clearInterval(interval);

                if (this.placeholderIndex < targetIndex) {
                    this.viewSlot.move(targetIndex, this.placeholderIndex);
                }
                else {
                    this.viewSlot.move(this.placeholderIndex, targetIndex);
                }

                const backup = this.items[this.placeholderIndex];
                this.items.splice(this.placeholderIndex, 1);
                this.items.splice(targetIndex, 0, backup);

                topLi.classList.remove("moving");
                this.placeholderIndex = targetIndex;
            }, duration);
        });
    }

    drop(event) {
        if (!this.clone) {
            return;
        }

        const targetView = this.domViewMap.get(this.elementBeingMoved);

        this.viewSlot.insert(this.placeholderIndex, targetView);
        this.viewSlot.remove(this.placeholder, false, true);

        this.animationLayer.removeChild(this.clone);
        this.animationLayer.classList.add("hidden");
        this.clone.classList.remove("moving");

        this.placeholder = null;
        this.clone = null;
        this.elementBeingMoved = null;
        this.itemDimentions = null;
    }
}