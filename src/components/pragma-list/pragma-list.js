import {bindable, customElement, inject} from 'aurelia-framework';
import {SearchFilter} from './../../lib/search-filter';

@customElement('pragma-list')
@inject(Element)
export class PragmaList {
    itemsBackup;

    /**
     * What items do you want to show in the list
     */
    @bindable items;

    /**
     * When performing a search, what field do you want to search on. Leave null to search all fields
     */
    @bindable searchField;

    /**
     * What text is being searched on curretly
     */
    @bindable searchText;

    constructor(element) {
        this.element = element;

        // define handlers
        // this.actionHandler = this.action.bind(this);
    }

    attached() {
        // initialize
    }

    detached() {
        // dispose
    }

    itemsChanged() {
        if (this.busySearching) {
            this.busySearching = false;
            return;
        }

        this.itemsBackup = this.items.slice(0);
    }

    searchTextChanged(newValue) {
        this.busySearching = true;

        if (newValue.length == 0) {
            return this.items = this.itemsBackup.slice(0);
        }

        SearchFilter(newValue, this.itemsBackup, this.searchField).then(result => this.items = result);
    }
}