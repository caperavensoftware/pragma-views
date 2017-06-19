import {customElement, bindable, inject} from 'aurelia-framework';
import {GroupWorker} from './../../lib/group-worker';
import {EventAggregator} from 'aurelia-event-aggregator';
import {arraysAreTheSame} from './../../lib/array-helpers';

@customElement('master-list-container')
@inject(GroupWorker, EventAggregator, Element)
export class MasterListContainer {
    element = null;
    groupedItems;

    /**
     * Items that are being displayed in the collection.
     * This is set internally.
     */
    @bindable items;

    /**
     * What items are represented in the grouping.
     * Tye objects used for this collection should atleast have the following fields
     *
     * id: numeric UID
     * title: display text for the tiem
     * value: the actual field value that can be used as search and filter
     * isOn: boolean property to identify a item as being activated on the grouping
     */
    @bindable groupingItems;

    /**
     * This is an array of strings defining what fields are currently being grouped on
     */
    @bindable groupedItems;

    /**
     * Define the columns shown in grid view
     */
    @bindable columnsManager;

    /**
     * This property is responsible for showing and hiding the grouping mechanism.
     * See the markup for details on where this binding is used.
     */
    @bindable showGroupings;

    /**
     * What is the id of the selected item represented in items
     */
    @bindable selectedId;

    /**
     * This represents the html structure that will be used as the template for the items
     */
    @bindable listTemplate;

    /**
     * This is a string value used to name the data cache this control has to work with
     */
    @bindable cacheId;

    /**
     * This is a property that allows drilldown items to flow between child controls
     */
    @bindable drilldownItems;

    /**
     * This is used internally by the binding between the percentage chart and the dropdown breadcrumb
     * Percentage chart will pick up changes of this propert and ract to it on it's own.
     */
    @bindable drilldownId;

    /**
     * List of items to show in the main dropdown
     */
    @bindable mainOptions;

    /**
     * Id of main options used
     */
    @bindable mainOptionsId;

    /**
     * The masterlist defines the perspective for it's own consumption and those of it's children.
     * NOTE: each child must handle how it interacts with the cache.
     * @returns {string}
     */
    get perspectiveId() {
        return `master-list`
    }

    constructor(groupWorker, eventAggregator, element) {
        this.element = element;
        this.eventAggregator = eventAggregator;
        this.groupWorker = groupWorker;
        this.showGroupings = false;

        this.mainOptions = [
            {
                id: 1,
                title: "Query builder"
            },
            {
                id: 2,
                title: "Grouping"
            },
            {
                id: 3,
                title: "Sorting"
            }
        ];
    }

    attached() {
        this.showQueryBuilderHandler = this.showQueryBuilder.bind(this);
        this.showGroupingsViewHandler = this.showGroupingsView.bind(this);
        this.showSortingHandler = this.showSorting.bind(this);

        this.actions = new Map([
            [1, this.showQueryBuilderHandler],
            [2, this.showGroupingsViewHandler],
            [3, this.showSortingHandler]
        ]);
    }

    detached() {
        this.recordsRetrievedEvent.dispose();
        this.recordsRetrievedHandler = null;

        this.showQueryBuilderHandler = null;
        this.showGroupingsViewHandler = null;
        this.showSortingHandler = null;
    }

    cacheIdChanged() {
        if (this.cacheId) {
            if (this.recordsRetrievedEvent) {
                this.recordsRetrievedEvent.dispose();
            }

            if (!this.recordsRetrievedHandler) {
                this.recordsRetrievedHandler = this.recordsRetrieved.bind(this);
            }

            this.recordsRetrievedEvent = this.eventAggregator.subscribe(`records_${this.cacheId}`, this.recordsRetrievedHandler);
            this.groupWorker.getRecordsFor(this.cacheId, null, null);
        }
    }

    /**
     * The items have chagned from a external source.
     * React to these changes.
     */
    itemsChanged() {
        if (this.items != null) {
            this.visibleItems = this.items.slice(0);
        }
    }

    /**
     * Monitor the open and close of the grouping property so that we can react to changes
     */
    showGroupingsChanged() {
        // only process if you are closing the grouping window
        if (this.showGroupings || !this.groupingItems) {
            return;
        }

        const newGroupingOrder = this.groupingItems.filter(item => item.isOn).map(item => item.value);
        const hasChanges = !arraysAreTheSame(this.groupedItems, newGroupingOrder);

        if (hasChanges) {
            this.groupedItems = newGroupingOrder;
        }
    }

    /**
     * This is a handler function that is called when new records are retrieved from the cache
     * @param args
     */
    recordsRetrieved(args) {
        this.items = args;
    }

    /**
     * Notify child items that the user has requested back tracking the current drilldown
     */
    back() {
        this.eventAggregator.publish(`${this.cacheId}_${this.perspectiveId}_back`);
    }

    /**
     * Show query builder
     */
    showQueryBuilder() {
        const rows = this.columnsManager.rowsHtml();
        this.listTemplate = rows;
        this.element.querySelector("#master-list").classList.add("grid-view");
    }

    /**
     *  Show the grouping view
     */
    showGroupingsView() {
        this.showGroupings = true;
    }

    /**
     *  Show the sorting view
     */
    showSorting() {
        console.log("show sorting");
    }

    /**
     * Respond to request from main toolbar
     */
    mainOptionsIdChanged() {
        if (this.mainOptionsId == -1) {
            return;
        }

        const key = Number(this.mainOptionsId);

        if (this.actions.has(key)) {
            this.actions.get(key)();
        }

        this.mainOptionsId = -1;
    }
}