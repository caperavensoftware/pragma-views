export function configure(aurelia) {
    return new Promise((resolve) => {
        aurelia.use
            .standardConfiguration()
            .developmentLogging()
            .globalResources(
                'pragma-menu/pragma-menu',
                'components/menu/menu',
                'components/input-composite/input-composite',
                'components/master-detail/master-detail',
                'components/assistant/assistant',
                'components/form-search/form-search.html',
                'components/icons/icons.html',
                'components/icons/icon.html',
                'components/pragma-messages/pragma-messages',
                'custom-attributes/selectable',
                'custom-attributes/sortable',
                'components/order-group/order-group',
                'components/percentage-chart/percentage-chart',
                'components/master-list-container/master-list-container',
                'components/pragma-grid/pragma-grid',
                'components/pragma-options-toolbar/pragma-options-toolbar',
                'components/pragma-dropdown-menu/pragma-dropdown-menu',
                'components/pragma-template/pragma-template',
                'components/group/group'
            )
            .plugin("aurelia-dialog");

        aurelia.start().then(() => {
            aurelia.setRoot();
            resolve();
        });
    });
}