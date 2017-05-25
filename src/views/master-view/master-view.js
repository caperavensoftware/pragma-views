import {bindable, inject} from 'aurelia-framework';
import {GroupWorker} from './../../lib/group-worker';
import {listTemplate1, populateTemplate} from './../../lib/template-parser-contstants';

@inject(Element, GroupWorker)
export class MasterView {
    @bindable groupingItems;
    @bindable listTemplate;
    @bindable cacheId;

    @bindable isMasterVisible;
    @bindable selectedId;

    @bindable toolbarSelectedId;
    @bindable toolbarItems;

    constructor(element, groupWorker) {
        this.groupingItems = orderGroupItems;
        this.groupWorker = groupWorker;
        this.cacheId = "test-cache";

        this.listTemplate = populateTemplate(listTemplate1, {
            "__field1__": "${code}",
            "__field2__": "${site}",
            "__field3__": "${name}",
            "__field4__": "${surname}",
            "__field5__": "${section}"
        });

        this.isMasterVisible = true;

        this.toolbarItems = [
            {
                id: 1,
                title: "Do Something",
                iconName: null
            }
        ]
    }

    attached() {
        this.groupWorker.createCache(this.cacheId, viewListItems);
    }

    detached() {
        this.groupWorker.disposeCache(this.cacheId);
    }

    selectedIdChanged() {
        console.log(this.selectedId);
    }

    toolbarSelectedIdChanged() {
        console.log(this.toolbarSelectedId);
    }
}

const orderGroupItems = [
    {
        id: 1,
        title: "IS ACTIVE",
        value: "isActive", 
        isOn: false
    },
    {
        id: 2,
        title: "SITE", 
        value: "site",
        isOn: false
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

export var viewListItems = [
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