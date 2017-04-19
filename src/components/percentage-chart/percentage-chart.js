
// @flow
import {customElement, bindable, inject} from 'aurelia-framework';

@customElement('percentage-chart')
@inject(Element)
export class PercentageChart {
    element = null;
    @bindable items;

    constructor(element) {
        this.element = element;
    }

    attached() {
    }

    chartDouble(event) {
        if(event.target.nodeName == "LI")
        {
        //    this.items = this.items[event.target.id].items;

                    console.log("eeeee");
                     console.log(this.items[event.target.id]);

                        var cusevent = new CustomEvent(
                            "newMessage", 
                            {
                                detail: {
                                    message: event.target.id,
                                    time: new Date(),
                                    id: event.target.id,
                                    fieldName: this.items[event.target.id].field,
                                    value: this.items[event.target.id].title
                                },

                                bubbles: true,
                                cancelable: true
                            }
                        );
                        
                        event.target.dispatchEvent(cusevent);

                        //document.getElementById("msgbox").dispatchEvent(event);
    
        }


    }
}
