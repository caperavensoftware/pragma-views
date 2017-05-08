import {expect, assert} from 'chai';
import {DynamicViewFactory} from './../../src/lib/dynamic-view-factory';

describe('App Tests', function() {
    let instance;

    beforeEach(function() {
        instance = new DynamicViewFactory();
    });

    it('constructor', function() {
        // Assert
        expect(instance).to.not.be.null;
    });

    it('not constructor', function() {
        // Assert
        expect(() => DynamicViewFactory()).to.throw("Cannot call a class as a function");
    });

    it('dispose', function() {
        // Act
        instance.dispose();

        // Assert
        // .. put your code here
    });

    it('addFactory', function() {

    });

    it('getViewInstance', function() {

    });
});