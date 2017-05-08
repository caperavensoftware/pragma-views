import {expect, assert} from 'chai';
import {PragmaDropdownMenu} from './../../../src/components/pragma-dropdown-menu/pragma-dropdown-menu';
import {ElementMockup} from './../../mockups/element-mockup';

describe('PragmaDropdownMenu Tests', function() {
    let instance;
    let element;

    beforeEach(function() {
        element = new ElementMockup();
        instance = new PragmaDropdownMenu(element);
    });

    it('constructor', function() {
        expect(instance).to.not.be.null;
    });

    it('not constructor', function() {
        expect(() => PragmaDropdownMenu()).to.throw("Cannot call a class as a function");
    });
});