import {expect, assert} from 'chai';
import 'aurelia-polyfills';
import {ElementMockup} from './../../../../node_modules/build-utilities/mockups/element-mockup';
import {PragmaTemplate} from './../../../../app/src/components/pragma-template/pragma-template';

describe('PragmaTemplate Tests', function() {
    let instance;
    let element;

    beforeEach(function() {
        element = new ElementMockup();
        instance = new PragmaTemplate(element);
    });

    it('constructor', function() {
        expect(instance).to.not.be.null;
    });

    it('not constructor', function() {
        expect(() => PragmaTemplate()).to.throw("Cannot call a class as a function");
    });
});