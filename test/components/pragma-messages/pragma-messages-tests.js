
import {expect} from 'chai';
import 'aurelia-polyfills';
import {PragmaMessages} from './../../../src/components/pragma-messages/pragma-messages';

describe('PragmaMessages Tests', function() {
    let pragmaMessages;

    beforeEach(function() {
        pragmaMessages = new PragmaMessages ({});
    });
    
    it('constructor', function() {
        expect(pragmaMessages).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => PragmaMessages()).to.throw("Cannot call a class as a function");
    });    
})
