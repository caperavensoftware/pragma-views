import {customElement, bindable, inject} from 'aurelia-framework';

@customElement('percentage-chart')
@inject(Element)
export class PercentageChart {
    element = null;
    @bindable items;
    @bindable maxAggregate;

    constructor(element) {
        this.element = element;
        this.maxAggregate = 0;
    }

    attached() {
    }

    itemsChanged() {
        if (!this.items) {
            this.maxAggregate = 0
        }
        else {
            let result = 0;

            for (let item of this.items) {
                result += item.aggregate.value;
            }

            this.maxAggregate = result;
        }
    }

    chartDouble(event) {
        if(event.target.nodeName == "LI")
        {
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
        }
    }
}
