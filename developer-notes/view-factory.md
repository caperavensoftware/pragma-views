#View Factory

##Introduction
The view factory is a common way to store templated html for the purpose getting bound instances when you need it.  
This is a good way to manually manage collections and multiple views. Under the hood it uses aurelia view compilers but provides a easy and clean way to compile instances.

##Usage

1. Register html with the factory with a access key   
`this.dynamicViewFactory.addFactory(true, groupTemplateHTML);`  
In this case the key value is "true" and the html we want to get back and bound is groupTemplateHTML.

1. Get the instance, bind it to a particular context and add it to the viewslot  
`            
let viewInstance = this.dynamicViewFactory.getViewInstance(this.isGroup, model);
this.rowsViewSlot.add(viewInstance);
`
1. If you are done with the template you can remove it from the factory.
`
this.dynamicViewFactory.removeFactory(true);
`

## Notes
1. You are responsible to maintain the factory content
1. You can pass any model to bind against when fetching a view on the same key
1. You are responsible for managing the viewslot where the view instance will be used