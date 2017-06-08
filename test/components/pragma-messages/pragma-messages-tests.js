
import {expect} from 'chai';
import 'aurelia-polyfills';
import {ElementMockup} from './../../mockups/element-mockup';
import {PragmaMessages} from './../../../src/components/pragma-messages/pragma-messages';

describe('PragmaMessages Tests', function() {
    let pragmaMessages;
    let element;

    beforeEach(function() {
        element = new ElementMockup();
        pragmaMessages = new PragmaMessages (element);
    });
    
    it('constructor', function() {
        expect(pragmaMessages).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => PragmaMessages()).to.throw("Cannot call a class as a function");
    });    
});
