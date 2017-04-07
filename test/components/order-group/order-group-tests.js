
import {expect} from 'chai';
import 'aurelia-polyfills';
import {OrderGroup} from './../../../src/components/order-group/order-group';

describe('OrderGroup Tests', function() {
    let orderGroup;

    beforeEach(function() {
        orderGroup = new OrderGroup ({});
    });
    
    it('constructor', function() {
        expect(orderGroup).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => OrderGroup()).to.throw("Cannot call a class as a function");
    });    
})
