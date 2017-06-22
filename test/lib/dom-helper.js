import {expect, assert} from 'chai';
import {DomHelper} from './../../src/lib/dom-helper.js';

describe('DomHelper Tests', function() {
    let instance;

    beforeEach(function() {
        instance = new DomHelper();
    });

    it('constructor', function() {
        // Assert
        expect(instance).to.not.be.null;
    });

    it('not constructor', function() {
        // Assert
        expect(() => DomHelper()).to.throw("Cannot call a class as a function");
    });

    it('dispose', function() {
        // Act
        instance.dispose();

        // Assert
        // .. put your code here
    });
});