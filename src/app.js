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
        ]);

        this.router = router;
    }
}