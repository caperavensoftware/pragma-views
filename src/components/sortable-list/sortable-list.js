import {customElement, inject, bindable, ViewCompiler, ViewSlot, Container, ViewResources, TemplatingEngine} from 'aurelia-framework';

@customElement('sortable-list')
@inject(Element, ViewCompiler, Container, ViewResources, TemplatingEngine)
export class SortableList {
    @bindable items;
    @bindable html;

    viewFactory;

    constructor(element, viewCompiler, container, viewResources, templatingEngine) {
        this.element = element;
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
        this.templatingEngine = templatingEngine;
    }

    attached() {
        let template = this.html;

        if (template.indexOf("<template>") == -1) {
            template = `<template>${template}</template>`
        };

        this.viewFactory = this.viewCompiler.compile(template, this.viewResources);
        this.viewSlot = new ViewSlot(this.listElement, true);

        this.itemsChanged();
    }

    detached() {
        this.viewSlot.removeAll(false, true);
        this.viewSlot = null;

        this.viewFactory.dispose();
        this.viewFactory = null;
    }

    itemsChanged() {
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
        }

        this.viewSlot.attached();
    }
}