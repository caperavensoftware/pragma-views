import {bindable, customElement, inject} from 'aurelia-framework';

export class MasterView {

    orderItems;
    chartItems;
    listItems;

    constructor(element) {
        this.element = element;
        this.orderItems = orderGroupItems;
        this.chartItems = percentageChartItems;
        this.listItems = viewListItems;
    }
}


const orderGroupItems = [
    {
        id: 1,
        title: "SITE", 
        isOn: false
    },
    {
        id: 2,
        title: "SECTION", 
        isOn: false
    },
    {
        id: 3,
        title: "TRADE", 
        isOn: false
    },
    {
        id: 4,
        title: "CODE", 
        isOn: false
    },
    {
        id: 5,
        title: "DESCRIPTION", 
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
        siteCode: "A21", 
        sectionCode: "ENG",
        id: 1
    },
    {
        code: "PROD", 
        name: "Owen", 
        surname: "Jacobs", 
        siteCode: "A31", 
        sectionCode: "ELEC",
        id: 2
    },
    {
        code: "MEWS", 
        name: "Phillip", 
        surname: "McDonald", 
        siteCode: "A21", 
        sectionCode: "OPER",
        id: 3
    },
    {
        code: "ELWS", 
        name: "Adrian", 
        surname: "Cruz", 
        siteCode: "A21", 
        sectionCode: "ELEC",
        id: 4
    },
    {
        code: "MEWS", 
        name: "Connor", 
        surname: "Francis", 
        siteCode: "A12", 
        sectionCode: "HAND",
        id: 5
    },
    {
        code: "HPPF", 
        name: "Beulah", 
        surname: "Arnold", 
        siteCode: "A11", 
        sectionCode: "ENG",
        id: 6
    },
    {
        code: "PROD", 
        name: "Seth", 
        surname: "Howard", 
        siteCode: "A21", 
        sectionCode: "ELEC",
        id: 7
    },
    {
        code: "ELWS", 
        name: "Francis", 
        surname: "Miller", 
        siteCode: "A31", 
        sectionCode: "ELEC",
        id: 8
    },
    {
        code: "PROD", 
        name: "Kevin", 
        surname: "Cunningham", 
        siteCode: "A21", 
        sectionCode: "ELEC",
        id: 9
    }
];