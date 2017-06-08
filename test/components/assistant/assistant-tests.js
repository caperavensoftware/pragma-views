
import {expect} from 'chai';
import 'aurelia-polyfills';
import {ElementMockup} from './../../mockups/element-mockup';
import {Assistant} from './../../../src/components/assistant/assistant';

describe('Assistant Tests', function() {
    let assistant;

    beforeEach(function() {
        assistant = new Assistant ({});
    });
    
    it('constructor', function() {
        expect(assistant).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => Assistant()).to.throw("Cannot call a class as a function");
    });    
})
