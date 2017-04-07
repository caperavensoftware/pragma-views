import {menuItems, quickItems} from './menu-items';

export class App {
    router = null;

    constructor() {
        this.menuItems = menuItems;
        this.quickItems = quickItems;
    }

    configureRouter(config, router) {
        config.title = 'Pragma Products';
        config.map([
            {route: ['', 'welcome'], name: 'welcome',      moduleId: 'views/welcome/welcome',      nav: true, title: 'Welcome'},
            {route: ['input-tests'], name: 'input-tests',      moduleId: 'views/input-tests/input-tests',      nav: true, title: 'Input Tests'},
            {route: ['master-view'], name: 'master-view',      moduleId: 'views/master-view/master-view',      nav: true, title: 'Master View'}
        ]);

        this.router = router;
    }
}