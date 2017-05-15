import {customElement, bindable, inject} from 'aurelia-framework';
import {GroupWorker, aggregates} from './../../lib/group-worker';
import {EventAggregator} from 'aurelia-event-aggregator';

@customElement('master-list-container')
@inject(GroupWorker, EventAggregator, Element)
export class MasterListContainer {
    element = null;
    chartItems;
    dataSet;
    path;
    filters;
    oldItems;
    dropdownItems;

    /**
     * Items that is bound atainst to show as the list
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


    @bindable isGroupBox;

    /**
     * What is the id of the selected item represented in items
     */
    @bindable selectedId;

    /**
     * When making a selection on the group, react to that selection by monitoring this property
     */
    @bindable selectedGroupById;

    /**
     * This represents the html structure that will be used as the template for the items
     */
    @bindable listTemplate;

    constructor(groupWorker, eventAggregator, element) {
        this.element = element;
        this.eventAggregator = eventAggregator;
        this.groupWorker = groupWorker;
        this.dropdownItems = [];
        this.path = [];
        this.filters = [];
    }

    attached()
    {
        this.oldItems = this.items.slice();
        this.handleDefaultAssetsHandler = this.handleDefaultAssets.bind(this);
        this.assetsDefaultSubscription =  this.eventAggregator.subscribe("staff_default", this.handleDefaultAssetsHandler);
        this.getRecordsForHandler = this.getRecordsFor.bind(this);
        this.getRecordsForSubscription =  this.eventAggregator.subscribe("records_staff", this.getRecordsForHandler);

        var groupColumns = [];

            for(var i = 0; i < this.groupingItems.length; i++)
            {
                if(this.groupingItems[i].isOn)
                {
                    groupColumns.push(this.groupingItems[i].value);
                }
            }

        this.groupWorker.createCache("staff", this.oldItems);
        this.groupWorker.createGroupPerspective("staff", "default", groupColumns, { aggregate: aggregates.count });

        this.chartDoubleClickHandler = this.chartDoubleClick.bind(this);
        document.addEventListener("chartDoubleClick", this.chartDoubleClickHandler, false);

        this.chartClickHandler = this.chartClick.bind(this);
        document.addEventListener("chartClick", this.chartClickHandler, false);
    }
    
    detached() {
        this.groupWorker.disposeCache("staff");
        this.groupWorker.disposeGroupPerspective("staff", "default");
        this.assetsDefaultSubscription.dispose();
        this.getRecordsForSubscription.dispose();
    }

    handleDefaultAssets(args) {
        this.chartItems = args.items;
        this.dataSet = args.items;
        this.dataDisplay = JSON.stringify(args);
    }

    getRecordsFor(args){
        this.items = args;
    }

    chartClick(args){
        this.filters.push({
           fieldName: args.detail.fieldName,
           value: args.detail.value
        });

        this.groupWorker.getRecordsFor("staff", "default", this.filters);
 
        this.filters.pop();
    }

    chartDoubleClick(args) {
        this.chartItems = this.chartItems[args.detail.id].items; 
        this.path.push(args.detail.id);
        this.dropdownItems.push({
            title: args.detail.field,
            id: args.detail.id
        });
    }

    selectedGroupByIdChanged()
    {
        //console.log(this.selectedGroupById);
    }

    isGroupBoxChanged()
    {
        // JHR: todo: this doesd not seem right. spend some time thinking through this.

        if(!this.isGroupBox)
        {
            var groupColumns = [];

            for(var i = 0; i < this.groupingItems.length; i++)
            {
                if(this.groupingItems[i].isOn)
                {
                    groupColumns.push(this.groupingItems[i].value);
                }
            }

            this.items = this.oldItems;
            this.filters = [];
            this.path = [];
            this.dropdownItems = [];

            this.groupWorker.disposeGroupPerspective("staff", "default");

            //this.groupWorker.createCache("staff", this.oldItems);
            this.groupWorker.createGroupPerspective("staff", "default", groupColumns, { aggregate: aggregates.count });
        
            //this.groupWorker.disposeCache("staff");
          
            this.groupWorker.disposeCache("staff");
        }
    }

    back() {
        var previousItems = this.dataSet;
        this.filters.pop();
        var fLen = this.path.length;

        for (var i = 0; i < (fLen - 1); i++) {
            previousItems = previousItems[this.path[i]].items;
        }

        this.groupWorker.getRecordsFor("staff", "default", this.filters);

        this.chartItems = previousItems;
        this.path.pop();
    }
}