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
                'custom-attributes/selectable'
            );

        aurelia.start().then(() => {
            aurelia.setRoot();
            resolve();
        });
    });
}