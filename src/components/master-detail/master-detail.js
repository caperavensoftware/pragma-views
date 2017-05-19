import {customElement, inject, bindable} from 'aurelia-framework';
import {isMobile} from './../../lib/device-helper';

@customElement('master-detail')
@inject(Element)
export class MasterDetail {
    element;
    masterElement;

    @bindable isMasterVisible;

    constructor(element) {
        this.element = element;
        this.element.classList.add(isMobile() ? "master-detail-mobile-layout" : "master-detail-desktop-layout");
    }

    attached() {
        this.masterElement = this.element.querySelector(".master");
        this.updateMasterVisiblity();
    }

    detached() {
        this.masterElement = null;
    }

    isMasterVisibleChanged() {
        this.updateMasterVisiblity();
    }

    updateMasterVisiblity() {
        if (this.masterElement) {
            if (this.isMasterVisible) {
                this.element.classList.remove("master-closed")
            }
            else {
                this.element.classList.add("master-closed")
            }
        }
    }
}
