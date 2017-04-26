import {bindable, customElement, inject} from 'aurelia-framework';
import {GroupWorker, aggregates} from './../../lib/group-worker';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(GroupWorker, EventAggregator, Element)
export class MasterView {

    @bindable dataDisplay;
    @bindable listItems;

    constructor(element) {
        this.listItems = viewListItems;
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
        isOn: false
    },
    {
        id: 4,
        title: "LOCATION",
        value: "location", 
        isOn: false
    }
];

const percentageChartItems = [
    {
        id: 1,
        code: "A11",
        title: "ABC Manufactoring CPT", 
        total: 12,
        max: 30
    },
    {
        id: 2,
        code: "A22",
        title: "ABC Manufactoring DBN", 
        total: 8,
        max: 30
    },
    {
        id: 3,
        code: "A31",
        title: "ABC Manufactoring JHB", 
        total: 4,
        max: 30
    },
    {
        id: 4,
        code: "A12",
        title: "ABC Manufactoring PE", 
        total: 6,
        max: 30
    }
];

export const viewListItems = [
    {
        code: "ZSMC", 
        name: "Mildred", 
        surname: "Bennett", 
        site: "A21", 
        section: "ENG",
        location: "capetown",
        isActive: true,
        id: 1,
        cost: 10
    },
    {
        code: "PROD", 
        name: "Owen", 
        surname: "Jacobs", 
        site: "A31", 
        section: "ELEC",
        location: "capetown",
        isActive: false,
        id: 2,
        cost: 11
    },
    {
        code: "MEWS", 
        name: "Phillip", 
        surname: "McDonald", 
        site: "A21", 
        section: "OPER",
        location: "capetown",
        isActive: true,
        id: 3,
        cost: 12
    },
    {
        code: "ELWS", 
        name: "Adrian", 
        surname: "Cruz", 
        site: "A21", 
        section: "ELEC",
        location: "capetown",
        isActive: true,
        id: 4,
        cost: 13
    },
    {
        code: "MEWS", 
        name: "Connor", 
        surname: "Francis", 
        site: "A12", 
        section: "HAND",
        location: "johannesburg",
        isActive: true,
        id: 5,
        cost: 14
    },
    {
        code: "HPPF", 
        name: "Beulah", 
        surname: "Arnold", 
        site: "A11", 
        section: "ENG",
        location: "capetown",
        isActive: true,
        id: 6,
        cost: 15
    },
    {
        code: "PROD", 
        name: "Seth", 
        surname: "Howard", 
        site: "A21", 
        section: "ELEC",
        location: "capetown",
        isActive: false,
        id: 7,
        cost: 16
    },
    {
        code: "ELWS", 
        name: "Francis", 
        surname: "Miller", 
        site: "A31", 
        section: "ELEC",
        location: "capetown",
        isActive: false,
        id: 8,
        cost: 17
    },
    {
        code: "PROD", 
        name: "Kevin", 
        surname: "Cunningham", 
        site: "A21", 
        section: "ELEC",
        location: "johannesburg",
        isActive: true,
        id: 9,
        cost: 18
    }
];