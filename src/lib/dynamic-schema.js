import {populateTemplate, inputHtml, textareaHtml, selectHtml, readOnlyHtml} from './template-parser-contstants';

/**
 * Process array of DynamicSchemaItem and give back html string representing that schema
 * @param schema: array of DynamicSchemaItem
 */
export function schemaToHtml(schema) {
    let html = "";

    for(let item of schema) {
        html += item.toHtml()
    }

    return html;
}

/**
 * When using dynamic dialog the UI is generated from the schema
 * Each item in the schema must be of DynamicSchemaItem.
 */
export class DynamicSchemaItem {
    /**
     * What is the title of the item being generated
     */
    title;

    /**
     * What is the field name that will be bound to.
     * The schema has a model property so the binding will assume model.name, you don't need to provide "model."
     */
    field;

    /**
     * What data type is this item of
     * This defines what type of control is rendered to represent this item.
     */
    dataType;

    /**
     * @constructor
     * @param title: string
     * @param field: string
     * @param dataType: DynamicSchemaFieldItem or DynamicSchemaCollectionItem
     */
    constructor(title, field, dataType) {
        this.title = title;
        this.field = field;
        this.dataType = dataType;
    }

    /**
     * process the schema item and provide the html according to the properites of the schema item
     */
    toHtml() {
        return this.dataType.toHtml(this.title, this.field);
    }
}

/**
 * This represents a item on the dialog and defines what type of item it is.
 * Depending on these properties, different types of controls will used to render this time.
 * See comments on format for string as a example
 */
export class DynamicSchemaFieldItem {
    /**
     * 1. "string"
     * 2. "number"
     * 3. "date"
     * 4. "duration"
     */
    type;

    /**
     * How is the type formatted?
     * 1. "string" -> format = length between 0 and N. If length is > 100 this represents a memo instead of a input.
     * 2. "number" -> format = N/A
     * 3. "date"   -> format = "date", "time", "datetime"
     * 4. "duration" -> N/A  is alsways HH:MM:SS
     */
    format;

    /**
     * @constructor
     * @param type: string
     * @param format: string
     */
    constructor(type, format) {
        this.type = type;
        this.format = format;
        this.attributeMap = new Map();
        this.attributeMap.set("string", ['type="text"']);
        this.attributeMap.set("number", ['type="number"']);
        this.attributeMap.set("date",   ['type="date"']);
        this.attributeMap.set("duration", ['type="text"', 'pattern="[0-9][0-9]:[0-9][0-9]:[0-9][0-9]"', 'placeholder="hh:mm:ss"']);
    }

    /**
     * process the schema item and provide the html according to the properites of the schema item
     * @param title: string
     * @param field: string
     */
    toHtml(title, field) {
        let template = inputHtml;
        let attributes = this.attributeMap.get(this.type);

        if (this.type == "string" && parseInt(this.format) > 100) {
            template = textareaHtml;
        }

        return populateTemplate(template, {
            "__prefix__": "model",
            "__field__": field,
            "__title__": title,
            "__description__": "",
            "__classes__": "",
            "__attributes__": attributes.join(" ")
        })
    }
}

/**
 * This is used to render collections on the dialog.
 * The UI will render this as a combobox.
 */
export class DynamicSchemaCollectionItem {
    /**
     * What is the property on the model to get the items from?
     */
    datasource;

    /**
     * @constructor
     * @param field: string
     * @param datasource: string
     */
    constructor(datasource) {
        this.datasource = datasource;
    }

    /**
     * process the schema item and provide the html according to the properites of the schema item
     * @param title: string
     * @param field: string
     */
    toHtml(title, field) {
        return populateTemplate(selectHtml, {
            "__prefix__": "model",
            "__field__": field,
            "__title__": title,
            "__datasource__": this.datasource,
            "__description__": "",
            "__content__": "${option.text}"
        });
    }
}

/**
 * This is used to render readonly field data in a dialog or other UI
 */
export class DynamicSchemaReadonlyItem {
    /**
     * Generate readonly html for given field
     * @param title: string
     * @param field: string
     */
    toHtml(title, field) {
        return populateTemplate(readOnlyHtml, {
            "__field__": field,
            "__title__": title,
            "__description__": "",
            "__content__": "${" + `model.${field}` + "}"
        })
    }
}