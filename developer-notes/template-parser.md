# Template Parser

## Introduction
This is the main way perform screen generation. Schemas are converted to html presentations.
Note that it only produces html, what you do with that is up to you. 
If your intent is to embed that html in your current screen I reconmend using the dynamic view loader as it will help you manage the data context and bindings.

## What gets generated
If you want to see what get's generated please look at the template parser constants file.

## Usage
`const html = this.templateParser.parse(templateJson)`

## Generate html from schema and inject it into container
```
this.templateParser.parse(JSON.parse(template)).then(result => {
    this.dynamicViewLoader.load(result, this.genContainer, this);
});
```

## Schema
The schema consists out of three parts:
1. type
1. fields
1. body

Type defines what type of schema it is, it does not affect the generation process.  
Fields define a mapping between fields described in the detail's binding statements and the actual field path used.  
Body define the actual layout and properties used in the screen generation process.

Recognised shorthands for screen generation are:

1. tabsheet
1. groups
1. input
1. checkbox
1. memo
1. button
1. elements
1. element

## General properties
You will often see the following properties for schemas in the examples below:
1. styles
1. attributes

Styles is an array of string values that populates the "class" attribute and attributes allow you to add any attribute to the element.
Attributes are defined as a object literal were the key is the name of the attribute and the value, the value of the attribute.
Using attributes you can add any aurelia custom attribute if you like.

e.g.
```json
{
  "element": "ul",
  "elements": [
    {
      "element": "li",
      "attributes": {
        "repeat.for": "item of items"
      },
      "content": "${item.text}"
    }
  ]
}
```

In the above example we are injecting the aurelia term that will affect binding of the list item.
The attribute defined above will translate into the aurelia term `repeat.for="item of items"`. 
Note that the context here is the view model. If your data is on a model object you will need to define that manually as `item of model.items`, the prefix does not apply to custom element schemas.

## Tabsheet schema item
Tabsheet is a array of tabs.

```json
"tabsheet": [
  {
    id: "tabDetails",
    title: "Details",
    groups: [
        ...
    ]
  }
]
```

Each tab has to define:
1. id - a unique identifier for this tab on the view
1. title - what caption should the tab should have

The tab webcontrol used during the generation process is the pragma-tabsheet.

Please note that if your content in the tab is not groups but other types of elements, instead of using the groups keyword please use "elements".

## Groups
The groups container allows you to define 1 to N group objects.

```json
"groups": [
  {
    id: "myGroup",
    title: "My Group",
    elements: [
        ...
    ]
  }
]
```

Using groups like this means that you can only have groups as children.
If you don't want only group children but mix it in with headers you have to use the "elements" objects and set the element type to group

```
"elements":[
    {
        "element": "h2",
        "content": "Hello World"
    },
    {
        "element": "group",
        "id": "detailGroup",
        "title": "detail",
        "elements": [
            ... elements go here
        ]
]
```
Each group item has to define:
1. id - a unique identifier for this group on the view
1. title - what caption should the group should have

## Input
The input schema is a 1:1 match for the html element "input". Input items are rendered in a input composite that manages layout and other features.

```json
{
  "element": "input",
  "title": "Site Code",
  "field": "site_code",
  "description": "code for site",           // optional - can use aurelia binding expression here ${siteCode}
  "styles": ["css-class-1", "css-class-2"], // optional
  "attributes": {                           // optional
    "pattern": "[Aa-Zz]"
  }
}
```

## Checkbox
The checkbox schea creates a input of type checkbox. It uses a particular composite layout as defined by the pragma standard layout.

```json
{
  "element": "checkbox",
  "title": "Is Active",
  "field": "is_active",
  "styles": ["switch"], // optional
  "attributes": {                           // optional
    "pattern": "[Aa-Zz]"
  }
}
```

## Memo
The memo schema translates to a html textarea control. This is also wrapped in a input composite.
If you want to use a textarea without the input composite rather use the "element" schema and define it as a textarea.

```json
{
  "element": "memo",
  "title": "Site Code",
  "field": "site_code",
  "description": "code for site",
  "styles": ["css-class-1", "css-class-2"],
  "attributes": {
    "pattern": "[Aa-Zz]"
  }
}
```

## Button
The button schema translates to a html button element.

```json
{
  "element": "button",
  "title": "Click Me",
  "action": "myFunction",
  "styles": ["css-class-1", "css-class-2"],
  "attributes": {
    "readonly": "true"
  }
}
```

Action defines the function to call. Note that this points to the view model so if the delegate is on the model you will need to include that in the value.
e.g.
`action: "model.myFunction"`

Please note that the action does not have any brackets as this is used for the binding expression and is automatically added. All you need to provide is the delegate name.

## Element
The element schema allows us to render any html we want. Any tagname can be used to define the content. This includes web components that your project uses.

```json
{
  "element": "div",
  "styles": ["container", "horizontal"],
  "attributes": {
    "role": "aria-toolbar"
  },
  "elements": [
      ...
  ]
}
```

It is important to note that all children of this element must be defined in the "elements" array. You can build the dom tree with "element" and "elements" pairs.
