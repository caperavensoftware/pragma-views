
import {expect} from 'chai';
import 'aurelia-polyfills';
import {DragManager} from './../../src/lib/drag-manager';

describe('DragManager Tests', function() {
    let dragManager;

    beforeEach(function() {
        dragManager = new DragManager ();
    });
    
    it('constructor', function() {
        expect(dragManager).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => DragManager()).to.throw("Cannot call a class as a function");
    });    
})
