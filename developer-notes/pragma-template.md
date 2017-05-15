# Pragma Template
There are scenarios where you want to have markup allowing you to bind against a dynamic template string defining a particular view model.
A example of this can be seen in the master master list container where we want to allow different templates in the list.

## Usage

```
<ul selectable="selected-id.two-way: selectedId">
    <li class="card li-styling" repeat.for="item of items" data-id="${item.id}">
        <pragma-template html.bind="listTemplate" data-item.bind="item"></pragma-template>
    </li>
</ul>
```

As you can see in the example above, you have to pass on two things to pragma-template:

1. html to use as the template and includes "<template>" tags.
1. the view-model to use for that item.

Note: because the view model is passed on, all bindings need to be relative to the view model being used.
e.g.

if you the view-model has a property called code you want to bind against the template must define that as

```
${code}
```