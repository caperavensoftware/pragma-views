import {bindable, customElement, inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@customElement('menu')
@inject(Element, Router)
export class Menu {
    element = null;

    @bindable menuItems = null;
    @bindable quickItems = null;
    @bindable searchText = null;
    @bindable quickFilter = false;

    menuItemsChanged() {
        if (!this.menuItemsBackup) {
            this.menuItemsBackup = this.menuItems.slice(0);
        }
    }

    quickItemsChanged() {
        for (let quickItem of this.quickItems) {
            quickItem.inQuicklaunch = true;
        }

        if (this.menuItems && this.quickItems) {
            for (let menuItem of this.menuItems) {
                const quickItem = this.quickItems.find((item) => {
                    return item.text === menuItem.text;
                });

                menuItem.inQuicklaunch = !!quickItem;
            }
        }
    }

    constructor(element, router) {
        this.element = element;
        this.router = router;

        this.canOpenMenuHandler = this.canOpenMenu.bind(this);
    }

    attached() {
        this.pragmaMenu.au["pragma-menu"].viewModel.canOpen = this.canOpenMenuHandler;
    }

    detached() {
        this.pragmaMenu.au["pragma-menu"].viewModel.canOpen = null;
    }

    canOpenMenu(target) {
        if (target.classList.contains("icon")) {
            return false;
        }

        return true;
    }

    menuSelected(event) {
        const plan = event.target.dataset.screen || "";

        if (plan.length == 0) {
            return;
        }

        let options = null;
        if (event.target.dataset.resource) {
            options = {
                resource: event.target.dataset.resource
            }
        }

        this.router.navigateToRoute(plan, options);
        this.pragmaMenu.au["pragma-menu"].viewModel.isOpen = false;

        event.preventDefault();
        event.stopPropagation();
    }

    searchTextChanged() {
        if (this.searchText.length == 0) {
            return this.quickFilterChanged()
        }

        this.filter();
    }

    filter() {
        let result;

        this.searchText = this.searchText || "";

        if (this.quickFilter) {
            result = this.quickItems.filter((item) => {
                return item.text.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
            });
        }
        else
        {
            result = this.menuItemsBackup.filter((item) => {
                return item.text.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
            });
        }

        this.menuItems = result;
    }

    quickFilterChanged() {
        if (this.quickFilter) {
            this.menuItems = this.quickItems.slice(0);
        }
        else {
            this.menuItems = this.menuItemsBackup.slice(0);
        }

        this.filter();
    }
}
