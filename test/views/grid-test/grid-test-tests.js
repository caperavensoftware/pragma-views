import {expect, assert} from 'chai';
import * as sinon from 'sinon';
import {EventAggregatorMock} from './../../mockups/event-aggrigator-mock';
import {GridTest} from './../../../src/views/grid-test/grid-test';

describe('GridTest Tests', function() {
    let instance;
    let eventAggregator;

    beforeEach(function() {
        eventAggregator = new EventAggregatorMock();
        instance = new GridTest(eventAggregator);
    });

    it('constructor', function() {
        expect(instance).to.not.be.null;
    });

    it('not constructor', function() {
        expect(() => GridTest()).to.throw("Cannot call a class as a function");
    });

    it.skip('attached', function() {
    });

    it.skip('detached', function() {
    });
});