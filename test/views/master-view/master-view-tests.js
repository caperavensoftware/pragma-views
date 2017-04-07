
import {expect} from 'chai';
import 'aurelia-polyfills';
import {MasterView} from './../../../src/views/master-view/master-view';

describe('MasterView Tests', function() {
    let masterView;

    beforeEach(function() {
        masterView = new MasterView ();
    });
    
    it('constructor', function() {
        expect(masterView).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => MasterView()).to.throw("Cannot call a class as a function");
    });    
})
