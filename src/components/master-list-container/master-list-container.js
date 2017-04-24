import {customElement, bindable, inject} from 'aurelia-framework';
import {GroupWorker, aggregates} from './../../lib/group-worker';
import {EventAggregator} from 'aurelia-event-aggregator';

@customElement('master-list-container')
@inject(GroupWorker, EventAggregator, Element)
export class MasterListContainer {
    element = null;
    orderItems;
    chartItems;
    @bindable items;
    dataSet;
    path;
    filters;
    oldItems;
    @bindable isGroupBox;
    @bindable selectedId;

    constructor(groupWorker, eventAggregator, element) {
        this.element = element;
        this.eventAggregator = eventAggregator;
        this.groupWorker = groupWorker;
        this.orderItems = orderGroupItems;
        this.path = [];
        this.filters = [];
    }

    attached()
    {
        this.oldItems = this.items.slice();
        this.handleDefaultAssetsHandler = this.handleDefaultAssets.bind(this);
        this.assetsDefaultSubscription =  this.eventAggregator.subscribe("staff_default", this.handleDefaultAssetsHandler);

        var groupColumns = [];

            for(var i = 0; i < this.orderItems.length; i++)
            {
                if(this.orderItems[i].isOn)
                {
                    groupColumns.push(this.orderItems[i].value);
                }
            }

        this.groupWorker.createCache("staff", this.oldItems);
        this.groupWorker.createGroupPerspective("staff", "default", groupColumns, { aggregate: aggregates.count });
    
        this.groupWorker.disposeCache("staff");

        this.chartDoubleClickHandler = this.groupAndFilter.bind(this);
        document.addEventListener("chartDoubleClick", this.chartDoubleClickHandler, false);

        this.chartClickHandler = this.filter.bind(this);
        document.addEventListener("chartClick", this.chartClickHandler, false);
    }

    handleDefaultAssets(args) {
        this.chartItems = args.items;
        this.dataSet = args.items;
        this.dataDisplay = JSON.stringify(args);
    }

    filter(args){
        this.filters.push({
           fieldName: args.detail.fieldName, 
           value: args.detail.value
        });

        this.runFilters();

        //this.items = this.items.filter(function(el){
          // return (el[args.detail.fieldName] === args.detail.value); 
        //});

        this.filters.pop();
    }

    selectedIdChanged()
    {
        console.log(this.selectedId);
    }


    groupAndFilter(args) {
        this.chartItems = this.chartItems[args.detail.id].items; 
        this.path.push(args.detail.id);
        this.filters.push({
           fieldName: args.detail.fieldName, 
           value: args.detail.value
        });

        this.items = this.items.filter(function(el){
           return (el[args.detail.fieldName] === args.detail.value); 
        });
    }

    isGroupBoxChanged()
    {
        if(!this.isGroupBox)
        {
            var groupColumns = [];

            for(var i = 0; i < this.orderItems.length; i++)
            {
                if(this.orderItems[i].isOn)
                {
                    groupColumns.push(this.orderItems[i].value);
                }
            }

            this.items = this.oldItems;
            this.filters = [];
            this.path = [];

            this.groupWorker.disposeGroupPerspective("staff", "default");

            this.groupWorker.createCache("staff", this.oldItems);
            this.groupWorker.createGroupPerspective("staff", "default", groupColumns, { aggregate: aggregates.count });
        
            this.groupWorker.disposeCache("staff");
        }
    }

    runFilters()
    {
        console.log("run filters");

        var filterItems = this.oldItems.slice();

        for(var j = 0; j < this.filters.length; j++){
            var fieldName = this.filters[j].fieldName;
            var value = this.filters[j].value;

            filterItems = filterItems.filter(function(el){
                return (el[fieldName] == value);
            });
        }

        this.items = filterItems;
    }

    back(){
        var previousItems = this.dataSet;
        this.filters.pop();
        var fLen = this.path.length;

        for (var i = 0; i < (fLen - 1); i++) {
            previousItems = previousItems[this.path[i]].items;
        }

        this.items = this.oldItems;

        for(var j = 0; j < this.filters.length; j++){
            var fieldName = this.filters[j].fieldName;
            var value = this.filters[j].value;

            this.items = this.items.filter(function(el){
                return (el[fieldName] == value);
            });
        }

        this.chartItems = previousItems;
        this.path.pop();
    }
}

const orderGroupItems = [
    {
        id: 1,
        title: "IS ACTIVE",
        value: "isActive", 
        isOn: true
    },
    {
        id: 2,
        title: "SITE", 
        value: "site",
        isOn: true
    },
    {
        id: 3,
        title: "SECTION",
        value: "section", 
        isOn: true
    },
    {
        id: 4,
        title: "LOCATION",
        value: "location", 
        isOn: true
    }
];
