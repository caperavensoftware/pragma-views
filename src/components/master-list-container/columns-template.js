import {populateTemplate, gridRowCellTemplate, gridRowTemplate} from './../../lib/template-parser-contstants';

export class ColumnsManager {
    items;

    /**
     * Constructor
     * @param columns
     */
    constructor(columns) {
        this.items = [];

        if (columns) {
            this.addColumns(columns);
        }
    }

    /**
     * Add a column to the items
     * @param column: Column
     */
    addColumn(column) {
        this.items.push(column);
    }

    /**
     * Add a array of columns to the items
     * @param columns: array
     */
    addColumns(columns) {
        for (let column of columns) {
            this.addColumn(column);
        }
    }

    headerHtml() {

    }

    /**
     * Generate a row html
     */
    rowsHtml() {
        const cells = [];

        for (let column of this.items) {
            cells.push(column.cellHtml());
        }

        const result = populateTemplate(gridRowTemplate, {
            "__row-cells__": cells.join("")
        });

        return result;
    }
}

export class Column {
    title;
    field;
    width;
    columnIndex;

    constructor(title, field, width, columnIndex) {
        this.title = title;
        this.field = field;
        this.width = width;
        this.columnIndex = columnIndex;
    }

    /**
     * Create the header cell that represents this column
     * @return {*}
     */
    headerCellHtml() {
        return populateTemplate(gridRowHeaderTemplate, {
            "__title__": "${" + this.title + "}",
            "__id__": this.columnIndex
        })
    }

    /**
     * Create the cell html that represents this column
     * @return {*}
     */
    cellHtml() {
        return populateTemplate(gridRowCellTemplate, {
            "__field__": "${" + this.field + "}",
            "__index__": this.columnIndex
        })
    }

    /**
     * Update the column properties in css to update the style
     */
    update(rootElement) {
        const elements = rootElement.querySelector(`[data-column-id="${this.columnIndex}"]`);

        for(let element of elements) {
            element.style.setProperty("width", this.width);
        }
    }
}