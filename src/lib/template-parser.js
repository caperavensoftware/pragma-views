import {populateTemplate, tabsheetHtml, tabHtml, groupHtml, inputHtml, textareaHtml, containerHtml, buttonHtml, dynamicHtml, checkboxHtml, selectHtml} from "./template-parser-contstants";

export class TemplateParser {
    fieldMap;

    /**
     * The model that you bind to may by hidden by some object layers.
     * The property prefix allows you what must be injected before the property so that the biding path will work.
     * This allows simple field definition on the template but complex binding paths.
     * @param propertyPrefix
     */
    constructor(propertyPrefix) {
        this.propertyPrefix = propertyPrefix;
        this.propertyPrefixStack = this.propertyPrefix.split(".");

        this.parseTabSheetHandler = this.parseTabSheet.bind(this);
        this.parseGroupsHandler = this.parseGroups.bind(this);
        this.parseGroupHandler = this.parseGroup.bind(this);
        this.parseInputHandler = this.parseInput.bind(this);
        this.parseTextAreaHandler = this.parseTextArea.bind(this);
        this.parseButtonHandler = this.parseButton.bind(this);
        this.parseElementsHandler = this.parseElements.bind(this);
        this.parseCheckboxHandler = this.parseCheckbox.bind(this);
        this.parseSelectHandler = this.parseSelect.bind(this);

        this.parseMap = new Map();
        this.parseMap.set("tabsheet", this.parseTabSheetHandler);
        this.parseMap.set("groups", this.parseGroupsHandler);
        this.parseMap.set("group", this.parseGroupHandler);
        this.parseMap.set("input", this.parseInputHandler);
        this.parseMap.set("memo", this.parseTextAreaHandler);
        this.parseMap.set("button", this.parseButtonHandler);
        this.parseMap.set("elements", this.parseElementsHandler);
        this.parseMap.set("checkbox", this.parseCheckboxHandler);
        this.parseMap.set("select", this.parseSelectHandler);
    }

    /**
     * @destructor
     */
    dispose() {
        if (this.fieldMap) {
            this.fieldMap.clear();
            this.fieldMap = null;
        }

        this.parseMap.clear();
        this.parseMap = null;

        this.parseTabSheetHandler = null;
        this.parseGroupsHandler = null;
        this.parseGroupHandler = null;
        this.parseInputHandler = null;
        this.parseTextAreaHandler = null;
        this.parseDivHandler = null;
        this.parseButtonHandler = null;
    }

    /**
     * Process the json template
     * @param json: template structure to process
     * @returns {string} html result
     */
    parse(json) {
        return new Promise(resolve => {
            this.setFieldMap(json.fields);
            const result = this.parseObject(json.body);;

            resolve(result);
        });
    }

    /**
     * Read the fields property of the json and create the field mappings
     * @param fields: fields collection to process
     */
    setFieldMap(fields) {
        this.fieldMap = new Map();

        for(let field of fields) {
            this.fieldMap.set(field.field, field.map);
        }
    }

    /**
     * Parse unknown object for particulars and navigate from here to more appropriate generators
     * @param obj: object to parse
     */
    parseObject(obj) {
        if (!obj) {
            return false;
        }

        const properties = Object.keys(obj);
        const result = [];
        for(let property of properties) {
            const propertyObect = obj[property];

            if (this.isKnownType(property)) {
                result.push(this.parseKnown(property, propertyObect));
            }
            else {
                result.push(this.parseObject(propertyObect));
            }
        }

        return result.join("");
    }

    /**
     * Evaluate if this property is a known key for specific parsing
     * @param property
     * @returns {boolean}
     */
    isKnownType(property) {
        return this.parseMap.has(property);
    }

    /**
     * Get the parser for a particular property and process the given object with that parser
     * @param property: key for the parser to extract
     * @param obj: object that needs to be parsed
     * @returns {string} html result
     */
    parseKnown(property, obj) {
        return this.parseMap.get(property)(obj);
    }

    /**
     * Parse the object as a tabsheet and generage html for it.
     * @param obj: Tabsheet object, should be array of tabs
     * @return {string}
     */
    parseTabSheet(tabsheet) {
        const tabsHTML = this.parseTabs(tabsheet);

        return populateTemplate(tabsheetHtml, {
            "__tabs__": tabsHTML
        });
    }

    /**
     * Parse object as tab.
     * The object should have the following properties
     * 1. id: unique identifier for the tab
     * 2. title: title to display at the top of the group
     * 3. groups: array of groups
     * @param obj: object to parse
     * @return {string}
     */
    parseTabs(tabs) {
        const result = [];
        const keysToSkip = ["id", "title"];

        for(let tab of tabs) {
            const keys = Object.keys(tab);
            let content = "";

            for(let key of keys) {
                if (keysToSkip.indexOf(key) === -1) {
                    if (this.isKnownType(key)) {
                        content += this.parseKnown(key, tab[key]);
                    }
                    else {
                        content += this.parseObject(tab[key]);
                    }
                }
            }

            result.push(populateTemplate(tabHtml, {
                "__id__": tab.id,
                "__title__": tab.title,
                "__content__": content
            }))
        }

        return result.join("");
    }

    /**
     * Parse object as a select element
     * Required fields are:
     * 1. field: what field is bound to the select
     * 2. title: what title should be shown int the label
     * 3. datasource: what is the property name on the prefix path that contains the items to show
     * 4. optionField: what is the field in the datasource object to display as the option text.
     * NOTE: the option must have a "id" property
     * @param select
     */
    parseSelect(select) {
        const field = select.field;
        const title = select.title;
        const description = select.description || "";
        const required = select.required || false;
        const optionField = select.optionField;
        const datasource = this.getPrefix(select.datasource) + this.cleanRelative(select.datasource);

        const result = populateTemplate(selectHtml, {
            "__prefix__": this.propertyPrefix,
            "__field__": field,
            "__title__": title,
            "__description__": description,
            "__required__": required,
            "__datasource__": datasource,
            "__content__": "${option." + optionField + "}",
        });

        return result;
    }

    /**
     * Remove all relative path markup from string
     * @param path
     * @returns {string}
     */
    cleanRelative(path) {
        return path.split("../").join("");
    }

    /**
     * determine the prefix based on relative path on field defined as definition
     * @param definition
     * @returns {*}
     */
    getPrefix(definition) {
        if (!definition || definition.indexOf("../") == -1) {
            return this.propertyPrefix;
        }

        const backCount = definition.split("../").length - 1;
        const prefixStack = this.propertyPrefixStack.length;
        const offset = prefixStack - backCount;

        if (offset < 0) {
            return ""
        }
        else
        {
            const result = this.propertyPrefixStack.splice(0, prefixStack - backCount).join(".");
            return result;
        }
    }

    /**
     * Parse a object as a group.
     * The object is expected to be an array of groups.
     * Each group must have the following fields:
     * 1. title: string to display as title of the group
     * 2. items: array fields that must be rendered. see parseElements
     * @param obj: object to parse
     */
    parseGroups(groups) {
        const result = [];
        for (let group of groups) {
            result.push(this.parseGroup(group));
        }
        return result.join("");
    }

    /**
     * Parse a single group and it's content
     * @param element
     * @returns {*}
     */
    parseGroup(element) {
        const fieldsHtml = this.parseElements(element.elements);
        return populateTemplate(groupHtml, {
            "__title__": element.title,
            "__content__": fieldsHtml
        });
    }

    /**
     * Parse a object as a input type
     * The object must contain the following fields:
     * 1. element: used to determine how to process the input type
     * @param obj
     */
    parseElements(elements) {
        if (!elements) {
            return "";
        }

        const result = [];

        for (let element of elements) {
            result.push(this.parseElement(element));
        }

        return result.join("");
    }

    /**
     * Parse checkbox
     * @param element
     * @returns {*}
     */
    parseCheckbox(element) {
        const title = element.title;
        const field = element.field;
        const description = element.description || "";
        const classes = this.processClasses(element);
        const attributes = this.processAttributes(element);

        return populateTemplate(checkboxHtml, {
            "__prefix__": this.getPrefix(field),
            "__field__": field,
            "__title__": title,
            "__description__": description,
            "__classes__": classes,
            "__attributes__": attributes
        });

    }

    /**
     * Parse a individual element and generate the direct it to the appropriate generateor
     * The object being parsed must have the following fields:
     * 1. element
     * @param element: object to parse
     */
    parseElement(element) {
        const elementType = element.element;
        if (this.isKnownType(elementType)) {
            return this.parseMap.get(elementType)(element);
        }
        else {
            return this.parseUnknown(element);
        }
    }

    /**
     * Parse element on a dynamic level interpreting custom elements
     * @param element
     */
    parseUnknown(element) {
        const classes = this.processClasses(element);
        const attributes = this.processAttributes(element);
        const content = element.content || this.parseElements(element.elements);

        return populateTemplate(dynamicHtml, {
            "__tagname__": element.element,
            "__classes__": classes,
            "__attributes__": attributes,
            "__content__": content,
        });
    }

    /**
     * Parse attributes defined in template to be part of the html
     * @param obj
     * @return {string}
     */
    processAttributes(obj) {
        const attributes = [];

        if (obj.attributes) {
            const attrKeys = Object.keys(obj.attributes);
            for(let attrKey of attrKeys) {
                attributes.push(`${attrKey}="${obj.attributes[attrKey]}"`)
            }
        }

        return attributes.join(" ");
    }

    /**
     * Process style classes
     * @param obj
     * @return {*}
     */
    processClasses(obj) {
        if (obj.styles) {
            if (Array.isArray(obj.styles)) {
                return `class="${obj.styles.join(" ")}"`;
            }

            return `class="${obj.styles}"`;
        }

        return "";
    }

    /**
     * Parse the object as a input composite
     * Properties that should be supplied are:
     * 1. title
     * 2. field
     * 3. type
     *
     * Additional properties you can define are:
     * 1. attributes: object literal
     * 2. classes: array of string
     * 3. descriptor
     *
     * Items that are lookup items must have the attribute "data-lookup" defined
     * @param input
     */
    parseInput(input) {
        const title = input.title;
        const field = input.field;
        const description = input.description || "";
        const required = input.required | false;
        const classes = this.processClasses(input);
        const attributes = this.processAttributes(input);

        return populateTemplate(inputHtml, {
            "__prefix__": this.getPrefix(field),
            "__field__": field,
            "__title__": title,
            "__description__": description,
            "__classes__": classes,
            "__attributes__": attributes,
            "__required__": required
        });
    }

    /**
     * Parse the object as a textarea composite
     * Properties that should be supplied are:
     * 1. title
     * 2. field
     *
     * Additional properties you can define are:
     * 1. attributes: object literal
     * 2. classes: array of string
     * 3. descriptor
     *
     * @param textaria
     */
    parseTextArea(memo) {
        const title = memo.title;
        const field = memo.field;
        const description = memo.descriptor || "";
        const required = input.required | false;
        const classes = this.processClasses(memo);
        const attributes = this.processAttributes(memo);

        return populateTemplate(textareaHtml, {
            "__prefix__": this.getPrefix(field),
            "__field__": field,
            "__title__": title,
            "__description__": description,
            "__classes__": classes,
            "__attributes__": attributes,
            "__required__": required
        });
    }

    /**
     * Parse object as button
     * Properties that should be provided:
     * 1. title
     * 2. action
     * @param button
     * @return {*}
     */
    parseButton(button) {
        const title = button.title;
        const action = button.action;
        const attributes = this.processAttributes(button);
        const classes = this.processClasses(button);

        return populateTemplate(buttonHtml, {
            "__title__": title,
            "__action__": action,
            "__classes__": classes,
            "__attributes__": attributes
        });
    }

}
