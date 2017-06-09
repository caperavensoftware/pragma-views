
import {expect} from 'chai';
import 'aurelia-polyfills';
import {InputListener} from './../../src/lib/input-listener';

describe('InputListener Tests', function() {
    let inputListener;

    beforeEach(function() {
        inputListener = new InputListener ();
    });
    
    it('constructor', function() {
        expect(inputListener).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => InputListener()).to.throw("Cannot call a class as a function");
    });    
})
