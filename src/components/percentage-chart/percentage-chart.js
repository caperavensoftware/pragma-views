import {customElement, bindable, inject} from 'aurelia-framework';
import {isMobile} from './../../lib/device-helper';

@customElement('percentage-chart')
@inject(Element)
export class PercentageChart {
    element = null;
    @bindable items;
    @bindable maxAggregate;
    tapedTwice;

    constructor(element) {
        this.tapedTwice = false;
        this.element = element;
        this.maxAggregate = 0;
    }

    attached() {
        this.ul = this.element.getElementsByTagName("ul")[0];
        
        if(!isMobile()) {
            this.ul.addEventListener("click", this.click.bind(this));
            this.ul.addEventListener("dblclick", this.dblClick.bind(this));
        }
        else {
            this.ul.addEventListener("touchstart", this.dblTapList.bind(this));
        }
    }

    detached()
    {
        this.ul.removeEventListener("click", this.click.bind(this));
        this.ul.removeEventListener("dblclick", this.dblClick.bind(this));
        this.ul.removeEventListener("touchstart", this.dblTapList.bind(this));
    }

    dblTapList(event) {

        if (!this.tapedTwice) {
            this.tapedTwice = true;
            setTimeout(() => {
                this.tapedTwice = false;
            }, 300);

            this.click(event);

            return false;
        }

        event.preventDefault();
        this.dblClick(event);
        return true;
    }

    itemsChanged() {
        if (!this.items) {
            this.maxAggregate = 0
        }
        else {
            let result = 0;
            for (let item of this.items) {
                
                if(item.aggregate){
                    result += item.aggregate.value;
                }
            }

            this.maxAggregate = result;
        }
    }

    click(event){

        if(event.target.nodeName == "LI")
        {
            var cusevent = new CustomEvent(
                "chartClick",
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

            if (this.oldSelectedItem) {
                this.oldSelectedItem.classList.remove("selected");
            }

            event.target.classList.add("selected");
            this.oldSelectedItem = event.target;

            event.target.dispatchEvent(cusevent);
        }
    }

    dblClick(event) {
        if(event.target.nodeName == "LI")
        {
            var cusevent = new CustomEvent(
                "chartDoubleClick",
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
