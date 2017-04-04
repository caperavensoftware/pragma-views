
import {expect} from 'chai';
import 'aurelia-polyfills';
import {GroupTest} from './../../../src/views/group-test/group-test';

describe('GroupTest Tests', function() {
    let groupTest;

    beforeEach(function() {
        groupTest = new GroupTest ();
    });
    
    it('constructor', function() {
        expect(groupTest).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => GroupTest()).to.throw("Cannot call a class as a function");
    });    
})
