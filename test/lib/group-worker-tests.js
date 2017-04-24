
import {expect} from 'chai';
import 'aurelia-polyfills';
import {GroupWorker} from './../../src/lib/group-worker';
import './workermockup';

describe('GroupWorker Tests', function() {
    let groupWorker;

    beforeEach(function() {
        groupWorker = new GroupWorker ();
    });
    
    it('constructor', function() {
        expect(groupWorker).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => GroupWorker()).to.throw("Cannot call a class as a function");
    });    
})
