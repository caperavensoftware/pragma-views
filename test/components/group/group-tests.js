import {expect, assert} from 'chai';
import 'aurelia-polyfills';
import {ElementMockup} from './../../../../node_modules/build-utilities/mockups/element-mockup';
import {Group} from './../../../../app/src/components/group/group';

describe('Group Tests', function() {
    let instance;
    let element;

    beforeEach(function() {
        element = new ElementMockup();
        instance = new Group(element);
    });

    it('constructor', function() {
        expect(instance).to.not.be.null;
    });

    it('not constructor', function() {
        expect(() => Group()).to.throw("Cannot call a class as a function");
    });
});