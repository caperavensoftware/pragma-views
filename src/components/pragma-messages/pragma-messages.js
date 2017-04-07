import {customElement, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@customElement('pragma-messages')
@inject(Element, EventAggregator)
export class PragmaMessages {
    element;
    messages;

    constructor(element, eventAggregator) {
        this.element = element;
        this.eventAggregator = eventAggregator;
        this.addMessagesHandler = this.addMessages.bind(this);

    }

    attached() {
        this.addMessageEvent = this.eventAggregator.subscribe("add-messages", this.addMessagesHandler);

        // temp
        this.eventAggregator.publish("add-messages", createSomeMessages());
    }

    detached() {
        this.addMessageEvent.dispose();
        addMessagesHandler = null;
    }

    addMessages(details) {
        this.messages = details;
    }

    clear() {
        this.messages = [];
    }

    toggle() {
        if (this.element.classList.contains("closed")) {
            this.element.classList.remove("closed");
        }
        else
        {
            this.element.classList.add("closed");
        }
    }
}

function createSomeMessages() {
    return [
        {
            type: "error",
            text: "Some error happend"
        },
        {
            type: "error",
            text: "Some error happend 2"
        },
        {
            type: "error",
            text: "Some error happend 3"
        },
        {
            type: "error",
            text: "Some error happend 4"
        },
        {
            type: "warning",
            text: "Some warning happend"
        },

    ]
}
