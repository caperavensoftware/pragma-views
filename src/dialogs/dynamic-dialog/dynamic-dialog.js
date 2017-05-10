import {inject, bindable} from "aurelia-framework";
import {DialogController} from 'aurelia-dialog';
import {DynamicViewLoader} from './../../lib/dynamic-view-loader';
import {schemaToHtml} from '../../lib/dynamic-schema';


@inject(DialogController, DynamicViewLoader)
export class DynamicDialog {
    @bindable title;

    constructor(dialogController, dynamicViewLoader) {
        this.controller = dialogController;
        this.dynamicViewLoader = dynamicViewLoader;

        this.controller.settings.lock = true;
        this.controller.settings.centerHorizontalOnly = true;
    }

    activate(schema) {
        this.title = schema.title;
        this.model = schema.model;
        this.html = schemaToHtml(schema.details);
    }

    attached() {
        console.log("attached");
        this.dynamicViewLoader.load(this.html, this.genContainer, this);
    }

    detached() {
        // dispose
    }
}