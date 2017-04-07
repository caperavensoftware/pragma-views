
import {expect} from 'chai';
import 'aurelia-polyfills';
import {PercentageChart} from './../../../src/components/percentage-chart/percentage-chart';

describe('PercentageChart Tests', function() {
    let percentageChart;

    beforeEach(function() {
        percentageChart = new PercentageChart ({});
    });
    
    it('constructor', function() {
        expect(percentageChart).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => PercentageChart()).to.throw("Cannot call a class as a function");
    });    
})
