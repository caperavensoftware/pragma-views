import {bindable, InlineViewStrategy} from 'aurelia-framework';

export class PragmaTemplate {
    @bindable html;
    @bindable dataItem;
    @bindable viewStrategy;

    htmlChanged() {
        this.viewStrategy = new InlineViewStrategy(this.html);
    }
}