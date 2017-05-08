import {inject, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator, bindable)
export class InputTests {
    @bindable testMenuItems;
    @bindable toolbarItems;

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

        this.toolbarItems = [
            {
                iconName: "search",
                title: "search"
            },
            {
                iconName: "leftarrow",
                title: "left arrow"
            },
            {
                iconName: "printer",
                title: "printer"
            }
        ]
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
