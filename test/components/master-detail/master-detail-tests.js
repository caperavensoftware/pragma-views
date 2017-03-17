import {expect} from 'chai';
import 'aurelia-polyfills';
import {MasterDetail} from './../../../src/components/master-detail/master-detail';
import {ElementMockup} from './../../mockups/element-mockup';
import './../../mockups/navigator-mockup';

describe('MasterDetail Tests', function() {
    let masterDetail;
    let element;

    beforeEach(function() {
        element = new ElementMockup();
        masterDetail = new MasterDetail(element);
    });
    
    it('constructor', function() {
        expect(masterDetail).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => MasterDetail()).to.throw("Cannot call a class as a function");
    });    
});
