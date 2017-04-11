import {customElement, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DynamicViewLoader} from './../../lib/dynamic-view-loader';

@customElement('pragma-messages')
@inject(Element, EventAggregator, DynamicViewLoader)
export class PragmaMessages {
    element;
    messages;

    get isOpen() {
        return this._isOpen;
    }

    set isOpen(value) {
        this._isOpen = value;

        if (value) {
            this.element.classList.remove("closed");
        }
        else
        {
            this.element.classList.add("closed");
        }
    }

    constructor(element, eventAggregator, dynamicViewLoader) {
        this.element = element;
        this.eventAggregator = eventAggregator;
        this.dynamicViewLoader = dynamicViewLoader;
        this.addMessagesHandler = this.addMessages.bind(this);
        this.setContextViewHandler = this.setContextView.bind(this);
        this.isOpen = false;
    }

    attached() {
        this.addMessageEvent = this.eventAggregator.subscribe("messages-add", this.addMessagesHandler);
        this.setContextViewEvent = this.eventAggregator.subscribe("messages-setContextView", this.setContextViewHandler);

        // temp
        this.eventAggregator.publish("messages-add", createSomeMessages());
    }

    detached() {
        this.addMessageEvent.dispose();
        this.setContextViewEvent.dispose();
        this.addMessagesHandler = null;
        this.setContextViewHandler = null;
    }

    addMessages(details) {
        this.messages = details;
    }

    setContextView(options) {
        const container = this.element.querySelector("#contextToolbar");
        this.dynamicViewLoader.load(options.view, container, options.viewModel);
    }

    clear() {
        this.messages = [];
    }

    toggle() {
        this.isOpen = !this.isOpen;
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
