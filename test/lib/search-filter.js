import {expect, assert} from 'chai';
import {SearchFilter} from './../../src/lib/search-filter.js';

describe('SearchFilter Tests', function() {
    let instance;

    beforeEach(function() {
        instance = new SearchFilter();
    });

    it('constructor', function() {
        // Assert
        expect(instance).to.not.be.null;
    });

    it('not constructor', function() {
        // Assert
        expect(() => SearchFilter()).to.throw("Cannot call a class as a function");
    });

    it('dispose', function() {
        // Act
        instance.dispose();

        // Assert
        // .. put your code here
    });
});