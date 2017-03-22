import {noView, inject, ViewCompiler, ViewSlot, Container, ViewResources, TemplatingEngine} from 'aurelia-framework';

@noView
@inject(ViewCompiler, Container, ViewResources, TemplatingEngine)
export class DynamicViewLoader {
    constructor(viewCompiler, container, resources, templatingEngine) {
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.resources = resources;
        this.templatingEngine = templatingEngine;
    }

    /**
     * Enhance element so that bindings will work
     * @param element
     */
    enhance(element, context) {
        this.templatingEngine.enhance({
            element: element,
            bindingContext: context
        })
    }

    /**
     * this method is the main function to generate screen information.
     * it takes in the template, a element to attach to and the binding context.
     * once this function is done, the UI will be generated and bound to.
     * @param templateSchema: JSON that defines the UI.
     * @param element
     * @param bindingContext
     */
    load(templateHtml, element, bindingContext) {
        const template = `<template>${templateHtml}</template>`;

        let viewFactory =  this.viewCompiler.compile(template, this.resources);

        if (this.view) {
            this.view.unbind();
            this.viewSlot.removeAll();
        }

        this.view = viewFactory.create(this.container);
        this.view.bind(bindingContext);

        if (!this.viewSlot) {
            this.viewSlot = new ViewSlot(element, true);
        }

        this.viewSlot.add(this.view);
        this.viewSlot.attached();
    }
}