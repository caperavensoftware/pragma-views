#Assistant component
The assistant is a container that allows you to inject contextual content.

#How to use
The first thing you need to do is add the assistant to your main.js file as globalResources using:

```js
'pragma-views/components/assistant/assistant'
```

The normal use for this component is that it is globally available and is used in app.html as:

```html
<template>
    <icons></icons>
    <div class="application-layout">
        <div class="application-body">
            <router-view></router-view>
        </div>

        <assistant>
        </assistant>
    </div>

    <div id="menu-background" aria-hidden="true"></div>
</template>
```

#Open and close the assistant
Event aggregation is used to send close and open messages to the assistant component.

```js
this.eventAggregator.publish("show-assistant", isOpen);
```

set isOpen true if it must be open and false to close.

#Contextual content
You can determine what html must be rendered in the assistant using event aggregation.

```js
const html = '<button click.delegate="sayHello()">Click Me</button>'

this.eventAggregator.publish("assistant", {
    view: html,
    viewModel: this
})
```

The object literal being passed contains two properties:
1. view
1. viewModel

The view is the raw html you want to display and contains all the bindings you may need.  
viewModel defines the object that the binding is done on.