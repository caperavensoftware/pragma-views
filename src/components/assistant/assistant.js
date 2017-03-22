import {customElement, bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DynamicViewLoader} from './../../lib/dynamic-view-loader';

@customElement('assistant')
@inject(Element, EventAggregator, DynamicViewLoader)
export class Assistant {
    element = null;
    @bindable isOpen;
    
    constructor(element, eventAggregator, dynamicViewLoader) {
        this.element = element;
        this.eventAggregator = eventAggregator;
        this.dynamicViewLoader = dynamicViewLoader;
        this.changeAssistantContentHandler = this.changeAssistantContent.bind(this);
    }

    attached() {
        this.assistSubscription = this.eventAggregator.subscribe("assistant", this.changeAssistantContentHandler);
    }

    detached() {
        this.assistSubscription.dispose();
        this.assistSubscription = null;

        this.changeAssistantContentHandler = null;
    }

    isOpenChanged() {
        if (this.isOpen) {
            this.element.classList.remove("close");
        }
        else
        {
            this.element.classList.add("close");
        }
    }

    close() {
        this.isOpen = false;
    }

    changeAssistantContent(options) {
        this.dynamicViewLoader.load(options.view, this.assistantContainer, options.viewModel);
    }
}
