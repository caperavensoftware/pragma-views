import {customElement, bindable, inject} from 'aurelia-framework';
import {GroupWorker, aggregates} from './../../lib/group-worker';
import {EventAggregator} from 'aurelia-event-aggregator';
import {isMobile} from './../../lib/device-helper';

@customElement('percentage-chart')
@inject(Element, GroupWorker, EventAggregator)
export class PercentageChart {
    element;
    groupWorker;
    maxAggregate;

    /**
     * These properties define all the information required to work with the group cache
     */
    @bindable cacheId;

    /**
     * What perspective should be used when quering the group cache
     */
    @bindable perspectiveId;

    /**
     * Array of strings defining the grouping order
     */
    @bindable groupedItems;

    /**
     * Internal use for displaying chart items
     */
    @bindable items;

    /**
     * constructor
     * @param element: DOMElement
     * @param groupWorker: GroupWorker
     * @param eventAggregator: EventAggregator
     */
    constructor(element, groupWorker, eventAggregator) {
        this.element = element;
        this.groupWorker = groupWorker;
        this.eventAggregator = eventAggregator;
        this.maxAggregate = 0;
        this.drilldownItems = [];
    }

    /**
     * Aurelia lifecycle event
     */
    attached() {
        this.updatePerspective();

        this.onGetDataHandler = this.onGetData.bind(this);
        this.onGetDataEvent = this.eventAggregator.subscribe(`${this.cacheId}_${this.perspectiveId}`, this.onGetDataHandler);

        this.backHandler = this.back.bind(this);
        this.onBackEvent = this.eventAggregator.subscribe(`${this.cacheId}_${this.perspectiveId}_back`, this.backHandler);
    }

    /**
     * Aurelia lifecycle event
     */
    detached()
    {
        this.onGetDataEvent.dispose();
        this.onGetDataHandler = null;

        this.onBackEvent.dispose();
        this.backHandler = null;

        this.groupWorker.disposeGroupPerspective(this.cacheId, this.perspectiveId);
    }

    /**
     * Parameters have changed, update the perspective to match the new parameters
     */
    updatePerspective() {
        this.groupWorker.disposeGroupPerspective(this.cacheId, this.perspectiveId);

        if (this.groupedItems && this.groupedItems.length > 0) {
            this.groupWorker.createGroupPerspective(this.cacheId, this.perspectiveId, this.groupedItems, { aggregate: aggregates.count });
        }
        else {
            this.items = null;
        }
    }

    /**
     * The groupedItems property changes, update yourself
     */
    groupedItemsChanged() {
        this.updatePerspective();
    }

    /**
     * perspective data was returned, update the display items
     * @param args
     */
    onGetData(args) {
        this.currentPerspective = args;
        this.items = args.items;
    }

    /**
     * Items has changed, react to the new set of items
     */
    itemsChanged() {
        this.maxAggregate = this.items ? this.items.reduce((acc, item) => acc + item.aggregate.value, 0) : 0;
    }

    /**
     * Perform drilldown action navigating down the stack
     * @param item
     */
    drilldown(item, event) {
        if (!item.lowestGroup) {
            this.drilldownItems.push(item);
            this.items = item.items;

            if (this.selectedDom) {
                this.selectedDom.removeAttribute("aria-selected");
            }
        }

        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    /**
     * Event hook for selecting item from DOM
     * @param item
     * @param event
     */
    selectDom(item, event) {
        const branchItems = this.groupWorker.getAllRecordsInBranch(item);
        this.eventAggregator.publish(`records_${this.cacheId}`, branchItems);

        if (this.selectedDom) {
            this.selectedDom.removeAttribute("aria-selected");
        }

        if (event) {
            this.selectedDom = this.parentLi(event.target);
            this.selectedDom.setAttribute("aria-selected", true);
        }
    }

    parentLi(target) {
        if (target.tagName == "LI") {
            return target;
        }

        return this.parentLi(target.parentElement);
    }

    /**
     * Reverse of drilldown, move up the stack
     */
    back() {
        if (this.drilldownItems.length > 0) {
            this.drilldownItems.splice(this.drilldownItems.length -1, 1);
        }

        const lastIndex = this.drilldownItems.length - 1;
        const lastItem = lastIndex > -1 ? this.drilldownItems[lastIndex] : this.currentPerspective;
        this.items = lastItem.items;
        this.selectDom(lastItem, null);
    }
}
