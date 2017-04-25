import {inject, ViewCompiler, Container, ViewResources} from 'aurelia-framework';

@inject(ViewCompiler, Container, ViewResources)
export class DynamicViewFactory {
    viewFactories;

    constructor(viewCompiler, container, resources) {
        this.viewCompiler = viewCompiler;
        this.resources = resources;
        this.container = container;
        this.viewFactories = new Map();
    }

    dispose() {
        this.viewFactories.clear();
        this.viewFactories = null;
        this.viewCompiler = null;
        this.resources = null;
        this.container = null;
    }

    addFactory(key, viewMarkup) {
        this.viewFactories.set(key);

        let markup = viewMarkup;
        if (markup.indexOf("<template>") == -1) {
            markup = `<template>${markup}</template>`;
        }

        const viewFactory = this.viewCompiler.compile(markup, this.resources);
        this.viewFactories.set(key, viewFactory);
    }

    removeFactory(key) {
        if (this.viewFactories.has(key)) {
            this.viewFactories.remove(key);
        }
    }

    getViewInstance(key, bindingContext) {
        if (!this.viewFactories.has(key)) {
            return null;
        }

        const view = this.viewFactories.get(key).create(this.container);
        view.bind(bindingContext);

        return view;
    }
}