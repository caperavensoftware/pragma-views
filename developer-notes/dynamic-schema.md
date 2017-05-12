# Dynamic Schema
This allows you to generate html from a schema object.
This is most often used in defining UI for dynamic dialogs but can also be used for other screens where you don't need a modifyable schema but instead adapt to a model.

## Usage example

```json
const schema: [
        new DynamicSchemaItem("Name", "name", new DynamicSchemaFieldItem("string", "50")),
        new DynamicSchemaItem("Age", "age", new DynamicSchemaFieldItem("number", "0-100")),
        new DynamicSchemaItem("Birth Date", "birthDate", new DynamicSchemaFieldItem("date")),
        new DynamicSchemaItem("Description", "description", new DynamicSchemaFieldItem("string", "500")),
        new DynamicSchemaItem("Duration", "duration", new DynamicSchemaFieldItem("duration")),
        new DynamicSchemaItem("Status", "status", new DynamicSchemaCollectionItem("statuses")),
        new DynamicSchemaItem("Status Value", "status", new DynamicSchemaReadonlyItem()),
    ]
    
const html = schemaToHtml(schema);
```

## Details
A schema is a array of DyanmicSchemaItem that contains these reqired properties.

1. title
2. field
3. datatype

title affects the label used on the input-composite used during generation.  
field is the name of the property you will bind against. This mechanism assumes that you are binding against a object called model.
The binding will thus be something like `model.field` even when you define it only as `field`
Data type is the object that defines what kind of UI to render. These types are:

1. DynamicSchemaFieldItem
2. DynamicSchemaCollectionItem
3. DynamicSchemaReadonlyItem

## DynamicSchemaFieldItem
This defines standard input types and has two properties.

1. type ('string', 'number', 'date', 'format')
1. format - this differs depending on what the type is.

type - format relationships can be defined as:

1. "string" -> format = length between 0 and N. If length is > 100 this represents a memo instead of a input.
1. "number" -> format = N/A
1. "date"   -> format = "date", "time", "datetime"
1. "duration" -> N/A  is alsways "HH:MM:SS"

## DynamicSchemaCollectionItem
Use DyamicSchemaCollectionItem when you want your input to be a combobox.
The field that the combobox is bound to is defined in the DyanmicSchemaItem's field property and the property name of the items are defined in the constructor of this class.

e.g.
```js
DynamicSchemaItem("Items", "selectedId", new DynamicSchemaCollectionItem("items"))
```

The items that define the dropdown must contain two properties.
1. id
2. text

The id is of type number and defines a numeric identifier.
The property the combobox is bound to represents the selected item in this collection.
The property bound to the combobox must also be of type number.

```json 
{
    selectedId: 1,
    items: [
        {
            id: 0,
            text: "Item 1"
        },
        {
            id: 1,
            text: "Item 2"
        }
    ]
}
```

With the above example the combobox will have two items and the default selected item will be Item 2.
If you selected Item 1 the selectedId will be 0;

## DynamicSchemaReadonlyItem
This class will render the field in a read only div wrapped in a input-composite.

```js 
DynamicSchemaItem("Status Value", "status", new DynamicSchemaReadonlyItem())
```