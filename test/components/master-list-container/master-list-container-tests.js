
import {expect} from 'chai';
import 'aurelia-polyfills';
import {MasterListContainer} from './../../../src/components/master-list-container/master-list-container';

describe('MasterListContainer Tests', function() {
    let masterListContainer;

    beforeEach(function() {
        masterListContainer = new MasterListContainer ({});
    });
    
    it('constructor', function() {
        expect(masterListContainer).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => MasterListContainer()).to.throw("Cannot call a class as a function");
    });    
})
