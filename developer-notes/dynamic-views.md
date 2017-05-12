#Dynamic Views

## What are dynamic views
Dynamic views allow you to render UI off a schema instead of a static html file.
How and when schemas are updated or if and where they are stored is up to the user.
Dynamic views have rules around the structure of the schema but beyond that the bus between the schema source and the screen is up to the user to implement.

## Mechanisms for dynamic views
All mechanisms generate html that is injected in a container and binding applied to it.
The dynamic view loader is responsible for injecting and performing implementing the bindings. See the dynamic view laoder for more details on that.

To two mechanisms that deal with view generation are:
1. Template parser
1. Dynamic schema objects
1. Dynamic view factory

For more details on how these items are used please see the individual documentation per mechanism.
The section below will focus on what these mechanisms are and when to use them.

## Template parser
The template parser receives the schema as a json object.  
This schema has a particular format and structure as defined the the template parser documentation.
The origin of the schema does not matter. It may be as a result of a server call or loaded from file.  

Template parser is very flexible and you can build a screen using any HTML layout.  
Any controls can be used in the template and this is the most flexible option.

Template parser shines when you have user configuration of screens and need a way to profile those changes.

## Dyamic schema objects
Dynamic schema objects is very focused to rendering input layout into a given container.  
You can not define layout. All generated inputs are part of template parser constants and only support those items.
This does not use a json template because this is not dynamic on the same level as the template parser.  
A classic example of where this is used is the dynamic dialog.  

Dynamic schema usage examples are not user configurable.

## Dynamic view factory
Dynamic view factory does not generate the HTML that is injected.  
This mechanism stores templated html with a key. It then allows you to retrieve a instance of said stored template and implement binding.
When you want to work with a particular view that repeats and you want to manually insert and delete content in a viewslot, this is the mechanism for you.

When you use this, please keep in mind that you should understand how to use aurelia viewslots.