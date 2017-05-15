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
        this.drilldownItems = new Set();
    }

    /**
     * Aurelia lifecycle event
     */
    attached() {
        this.updatePerspective();

        this.onGetDataHandler = this.onGetData.bind(this);
        this.onGetDataEvent = this.eventAggregator.subscribe(`${this.cacheId}_${this.perspectiveId}`, this.onGetDataHandler);
    }

    /**
     * Aurelia lifecycle event
     */
    detached()
    {
        this.onGetDataEvent.dispose();
        this.onGetDataHandler = null;

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

    drilldown(item) {
        if (!item.lowestGroup) {
            this.drilldownItems.add(item);
            this.items = item.items;
        }
    }

    select(item) {
        console.log(item);
    }
}
