
import {expect} from 'chai';
import 'aurelia-polyfills';
import {InputTests} from './../../../src/views/input-tests/input-tests';

describe('Input Tests', function() {
    let input;

    beforeEach(function() {
        input = new InputTests ();
    });
    
    it('constructor', function() {
        expect(input).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => InputTests()).to.throw("Cannot call a class as a function");
    });    
})
