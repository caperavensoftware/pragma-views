
import {expect} from 'chai';
import 'aurelia-polyfills';
import {Sortable} from './../../../src/views/sortable/sortable';

describe('Sortable Tests', function() {
    let sortable;

    beforeEach(function() {
        sortable = new Sortable ();
    });
    
    it('constructor', function() {
        expect(sortable).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => Sortable()).to.throw("Cannot call a class as a function");
    });    
})
