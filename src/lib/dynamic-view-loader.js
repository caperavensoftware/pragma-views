import {noView, inject, ViewCompiler, ViewSlot, Container, ViewResources, TemplatingEngine} from 'aurelia-framework';

@noView
@inject(ViewCompiler, Container, ViewResources, TemplatingEngine)
export class DynamicViewLoader {
    /**
     * Constructor
     * @param viewCompiler
     * @param container
     * @param resources
     * @param templatingEngine
     */
    constructor(viewCompiler, container, resources, templatingEngine) {
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.resources = resources;
        this.templatingEngine = templatingEngine;
        this.viewMap = new Map();
    }

    /**
     * Dispose a particular view container as based on the container element
     * @param element
     */
    disposeFor(element) {
        const viewSource = this.unload(element);

        if (viewSource) {
            viewSource.view = null;
            viewSource.viewSlot = null;

            this.viewMap.delete(element);
        }
    }

    /**
     * Destructor
     */
    dispose() {
        const mapKeys = Array.from(this.viewMap.keys());

        for (let mapKey of mapKeys) {
            this.disposeFor(mapKey);
        }

        this.viewMap.clear();
        this.viewMap = null;
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
     * Unload a view if the view source element has a view
     * @param element
     * @returns {*}
     */
    unload(element) {
        let viewSource = null;

        if (this.viewMap.has(element)) {
            viewSource = this.viewMap.get(element);
            viewSource.view.unbind();
            viewSource.viewSlot.removeAll();
        }

        return viewSource;
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
        let viewSource = this.unload(element);
        const viewFactory =  this.viewCompiler.compile(`<template>${templateHtml}</template>`, this.resources);

        const view = viewFactory.create(this.container);
        view.bind(bindingContext);

        if (viewSource) {
            viewSource.view = view;
        }
        else {
            viewSource = {
                view: view,
                viewSlot: new ViewSlot(element, true)
            };

            this.viewMap.set(element, viewSource);
        }

        viewSource.viewSlot.add(view);
        viewSource.viewSlot.attached();
    }
}