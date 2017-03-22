import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

class CustomViewModel {
    sayHello() {
        console.log("Say Hello");
    }
}

@inject(EventAggregator)
export class Welcome {
    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
    }

    assist() {
        const html = '<button click.delegate="sayHello()">Click Me</button>'

        this.eventAggregator.publish("assistant", {
            view: html,
            viewModel: new CustomViewModel()
        })
    }
}