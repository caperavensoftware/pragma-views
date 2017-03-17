
import {expect} from 'chai';
import 'aurelia-polyfills';
import {Selectable} from './../../src/custom-attributes/selectable';

describe('Selectable Tests', function() {
    let selectable;

    beforeEach(function() {
        selectable = new Selectable ();
    });
    
    it('constructor', function() {
        expect(selectable).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => Selectable()).to.throw("Cannot call a class as a function");
    });    
});
