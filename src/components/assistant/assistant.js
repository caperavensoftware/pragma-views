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
    }

    attached() {
        this.changeAssistantContentHandler = this.changeAssistantContent.bind(this);
        this.showAssistHandler = this.showAssist.bind(this);

        this.assistSubscription = this.eventAggregator.subscribe("assistant", this.changeAssistantContentHandler);
        this.showAssistEvent = this.eventAggregator.subscribe("show-assistant", this.showAssistHandler);
    }

    detached() {
        this.assistSubscription.dispose();
        this.assistSubscription = null;

        this.showAssistEvent.dispose();
        this.showAssistEvent = null;

        this.changeAssistantContentHandler = null;
        this.showAssistHandler = null;
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

    showAssist(isVisible) {
        this.isOpen = isVisible == true;
    }
}
