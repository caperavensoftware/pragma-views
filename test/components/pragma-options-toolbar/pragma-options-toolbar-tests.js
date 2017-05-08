import {expect, assert} from 'chai';
import {PragmaOptionsToolbar} from './../../../src/components/pragma-options-toolbar/pragma-options-toolbar';
import {ElementMockup} from './../../mockups/element-mockup';

describe('PragmaOptionsToolbar Tests', function() {
    let instance;
    let element;

    beforeEach(function() {
        element = new ElementMockup();
        instance = new PragmaOptionsToolbar(element);
    });

    it('constructor', function() {
        expect(instance).to.not.be.null;
    });

    it('not constructor', function() {
        expect(() => PragmaOptionsToolbar()).to.throw("Cannot call a class as a function");
    });
});