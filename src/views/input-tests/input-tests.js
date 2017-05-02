import {inject, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator, bindable)
export class InputTests {
    @bindable testMenuItems;

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.testMenuItems = [
            {
                iconName: "input",
                title: "input"
            },
            {
                iconName: "back",
                title: "back"
            },
            {
                iconName: "dropdown",
                title: "dropdown"
            }
        ];
    }

    attached() {
        this.eventAggregator.publish("messages-setContextView", {
            view: '<button click.delegate="save()">Save</button>',
            viewModel: this
        })
    }

    save() {
        alert("save");
    }

    showErrors(){
        document.querySelector("pragma-messages").au["pragma-messages"].viewModel.isOpen = true;
    }
}
