import {customElement, inject, bindable, ViewCompiler, ViewSlot, Container, ViewResources, TemplatingEngine} from 'aurelia-framework';
import {InputListener, inputEventType} from './../../lib/input-listener';
import {getValidLi, findParentLi, createHighlightFor, setStyleDimentions} from './../../lib/dom-helper';

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
    containerDimentions;

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

        this.containerDimentions = this.element.querySelector("ul").getBoundingClientRect();
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



    startDrag(event) {
        if (!this.sort || this.elementBeingMoved) {
            return false;
        }

        this.elementBeingMoved = getValidLi(event, this.selectQuery);

        // clicked on empty space
        if (!this.elementBeingMoved) {
            return false;
        }

        this.clone = this.elementBeingMoved.cloneNode(true);

        if (this.clone) {
            requestAnimationFrame(_ => {
                this.itemDimentions = this.elementBeingMoved.getBoundingClientRect();

                this.createHighlight();
                this.createDragClone();
                this.setPlaceholder();
            });
        }
    }

    createHighlight() {
        this.highlight = createHighlightFor(this.elementBeingMoved, this.itemDimentions, this.containerDimentions);
        this.animationLayer.appendChild(this.highlight);
    }

    setPlaceholder() {
        this.placeholder = this.placeholderFactory.create(this.container);
        this.placeholder.firstChild.style.setProperty("--width", this.itemDimentions.width);
        this.placeholder.firstChild.style.setProperty("--height", this.itemDimentions.height);

        this.viewBeingMoved = this.domViewMap.get(this.elementBeingMoved);

        this.placeholderIndex = this.viewSlot.children.indexOf(this.viewBeingMoved);
        this.viewSlot.insert(this.placeholderIndex, this.placeholder);
        this.viewSlot.remove(this.viewBeingMoved, false, true);
    }

    createDragClone() {
        this.clone.classList.add("clone");
        this.clone.style.setProperty("--x", this.itemDimentions.left);
        this.clone.style.setProperty("--y", this.itemDimentions.top);
        this.clone.style.setProperty("--width", this.itemDimentions.width);
        this.clone.style.setProperty("--height", this.itemDimentions.height);

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
        this.highlightLiAt(x, y);
    }

    highlightLiAt(x, y) {
        const topElement = document.elementFromPoint(x, y);
        if (!topElement) {
            return;
        }

        const topLi = findParentLi(topElement);

        this.lastTopLi = topLi;

        requestAnimationFrame(_ => {
            const dimentions = topLi ? topLi.getBoundingClientRect() : topElement.getBoundingClientRect();
            setStyleDimentions(this.highlight, dimentions, this.containerDimentions);
        })
    }

    performDrop() {
        if (this.lastTopLi == null) {
            return this.replacePlaceholder(this.placeholderIndex);
        }

        const targetView = this.domViewMap.get(this.lastTopLi);
        const targetIndex = this.viewSlot.children.indexOf(targetView);

        this.replacePlaceholder(targetIndex);

        const backup = this.items[this.placeholderIndex];
        this.items.splice(this.placeholderIndex, 1);
        this.items.splice(targetIndex, 0, backup);
    }

    replacePlaceholder(targetIndex) {
        this.viewSlot.remove(this.placeholder, false, true);
        this.viewSlot.insert(targetIndex, this.viewBeingMoved);
    }

    drop(event) {
        if (!this.clone) {
            return;
        }

        this.performDrop();

        this.animationLayer.removeChild(this.clone);
        this.animationLayer.removeChild(this.highlight);

        this.animationLayer.classList.add("hidden");
        this.clone.classList.remove("moving");

        this.placeholder = null;
        this.clone = null;
        this.highlight = null;
        this.elementBeingMoved = null;
        this.itemDimentions = null;
        this.lastTopLi = null;
        this.viewBeingMoved = null;
    }
}