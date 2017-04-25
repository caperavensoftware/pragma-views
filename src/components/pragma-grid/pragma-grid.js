import {customElement, inject, bindable, NewInstance, ViewSlot} from 'aurelia-framework';
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

        this.headerViewSlot = new ViewSlot(this.headrow, true);
        this.rowsViewSlot = new ViewSlot(this.body, true);

        this.updateHeader();
        this.updateRows();
    }

    detached() {
        this.dynamicViewFactory.dispose();
        this.dynamicViewFactory = null;
        this.columns = null;
    }

    updateHeader() {
        if (!this.rowsViewSlot) {
            return;
        }

        for (let column of this.columns) {
            const view = this.dynamicViewFactory.getViewInstance("th", column);
            this.headerViewSlot.add(view);
        }

        this.headerViewSlot.attached();
    }

    updateRowCellFactory() {
        const result = [];
        for(let column of this.columns) {
            result.push(`<td>${column.field}</td>`);
        }

        const template = `<template>${result.join("")}</template>`;
        this.dynamicViewFactory.addFactory(false, template);
    }

    updateRows() {
        if (!this.items) {
            return;
        }

        for(let row of this.items) {
            let viewInstance = this.dynamicViewFactory.getViewInstance(row.isGroup, row);
            this.rowsViewSlot.add(viewInstance);
        }
    }

    itemsChanged() {
        this.updateRows();
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