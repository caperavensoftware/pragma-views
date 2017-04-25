import {customElement, inject, bindable, NewInstance} from 'aurelia-framework';
import {DynamicViewFactory} from './../../lib/dynamic-view-factory';
import columnHeaderTemplate from './column.template.html!text';
import groupTemplate from './group.template.html!text';

@customElement('pragma-grid')
@inject(Element, NewInstance.of(DynamicViewFactory) )
export class PragmaGrid {
    @bindable columns;
    @bindable items;
    @bindable numberOfColumns;

    columnsChanged() {
        this.numberOfColumns = this.columns ? this.columns.length : 0;

        if (this.columns) {
            this.updateHeader();
            this.updateRowCellFactory();
        }
        else if (this.dynamicViewFactory) {
            this.dynamicViewFactory.removeFactory(false);
        }
    }

    constructor(element, dynamicViewFactory) {
        this.element = element;
        this.dynamicViewFactory = dynamicViewFactory;
    }

    attached() {
        this.dynamicViewFactory.addFactory(true, groupTemplate);
        this.dynamicViewFactory.addFactory("th", columnHeaderTemplate);
    }

    detached() {
        this.dynamicViewFactory.dispose();
        this.dynamicViewFactory = null;
        this.columns = null;
    }

    updateHeader() {

    }

    updateRowCellFactory() {
        const result = [];
        for(let column of this.columns) {
            // binding expression so can't use ES6 strings because it uses the same binding syntax
            result.push('<td>${' + column + '}</td>')
        }

        const template = `<template>${result.join("")}</template>`;
        this.dynamicViewFactory.addFactory(false, template);
    }
}

export class GridColumn {
    title;
    width;
    background;
    field;

    constructor(field, title, width, background) {
        this.title = title;
        this.width = width;
        this.background = background;
        this.field = field;
    }
}