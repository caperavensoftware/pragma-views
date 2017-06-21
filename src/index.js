// // components
// export * from './components/assistant/assistant';
// export * from './components/group/group';
// export * from './components/input-composite/input-composite';
// export * from './components/master-detail/master-detail';
// export * from './components/master-list-container/master-list-container';
// export * from './components/menu/menu';
// export * from './components/order-group/order-group';
// export * from './components/percentage-chart/percentage-chart';
// export * from './components/pragma-dropdown-menu/pragma-dropdown-menu';
// export * from './components/pragma-messages/pragma-messages';
// export * from './components/pragma-options-toolbar/pragma-options-toolbar';
// export * from './components/sortable-list/sortable-list';
// export * from './components/pragma-template/pragma-template';
//
// // custom attributes
// export * from './custom-attributes/selectable';

// dialogs
export * from './dialogs/dynamic-dialog/dynamic-dialog';

// library
export * from './lib/array-helpers';
export * from './lib/canvas-helpers';
export * from './lib/device-helper';
export * from './lib/dynamic-schema';
export * from './lib/dynamic-view-factory'
export * from './lib/dynamic-view-loader';
export * from './lib/group-worker';
export * from './lib/input-listener';
export * from './lib/template-parser';
export * from './lib/template-parser-contstants';

export function configure(config) {
    config.globalResources(
        './components/assistant/assistant',
        './components/group/group',
        './components/input-composite/input-composite',
        './components/master-detail/master-detail',
        './components/master-list-container/master-list-container',
        './components/menu/menu',
        './components/order-group/order-group',
        './components/percentage-chart/percentage-chart',
        './components/pragma-dropdown-menu/pragma-dropdown-menu',
        './components/pragma-messages/pragma-messages',
        './components/pragma-options-toolbar/pragma-options-toolbar',
        './components/sortable-list/sortable-list',
        './components/pragma-template/pragma-template',
        './custom-attributes/selectable'
    );
}