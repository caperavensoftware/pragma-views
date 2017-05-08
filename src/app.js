import {menuItems, quickItems} from './menu-items';
import {isMobile} from './lib/device-helper';

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
            {route: ['master-view'], name: 'master-view',      moduleId: 'views/master-view/master-view',      nav: true, title: 'Master View'},
            {route: ['group-test'], name: 'group-test',      moduleId: 'views/group-test/group-test',      nav: true, title: 'Group Tests'},
            {route: ['grid-test'], name: 'grid-test',      moduleId: 'views/grid-test/grid-test',      nav: true, title: 'Grid Tests'}
        ]);

        this.router = router;
    }

    attached() {
        if (isMobile()) {
            this.closeAssistant();
        }
    }

    closeAssistant() {
        this.assistant.au["assistant"].viewModel.isOpen = false;
    }
}