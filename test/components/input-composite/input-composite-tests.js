import {expect, assert} from 'chai';
import * as sinon from 'sinon';
import {InputComposite} from './../../../src/components/input-composite/input-composite';
import {ElementMockup} from './../../mockups/element-mockup';

describe('InputComposite Tests', function() {
    let inputComposite;
    let element;
    let inputElement;

    function customQuerySelector(query) {
        const result = new ElementMockup();

        if (query === "#inputSlot") {
            result.children.push(inputElement);
        }

        return result;
    }

    beforeEach(function() {
        element = new ElementMockup();
        inputElement = new ElementMockup();

        element.querySelector = customQuerySelector;
        inputComposite = new InputComposite (element);
    });
    
    it('constructor', function() {
        expect(inputComposite).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => InputComposite()).to.throw("Cannot call a class as a function");
    });

    it('attached', function() {
        // Arrange
        const checkValiditySpy = sinon.spy(inputComposite, "checkValidity");
        const addEventListenerSpy = sinon.spy(inputElement, "addEventListener");

        inputComposite.id = "id";

        // Act
        inputComposite.attached();

        // Assert
        expect(inputComposite.input.id).to.equal("id_input", "id should be id_input");
        expect(inputComposite.input.style.display).to.equal("block", "display style should be block");
        expect(inputComposite.input.style.width).to.equal("100%", "width style should be 100%");

        assert(checkValiditySpy.calledOnce, "checkValidity should have been called once");
        checkValiditySpy.restore();

        assert(addEventListenerSpy.withArgs("focus").calledOnce, "focus should be called");
        assert(addEventListenerSpy.withArgs("blur").calledOnce, "focus should be called");
        assert(addEventListenerSpy.withArgs("keyup").calledOnce, "focus should be called");
        addEventListenerSpy.restore();
    });

    it("detached", function() {
        // Arrange
        inputComposite.input = new ElementMockup();
        const removeEventListenerSpy = sinon.spy(inputComposite.input, "removeEventListener");

        // Act
        inputComposite.detached();

        // Assert
        assert(removeEventListenerSpy.withArgs("focus").calledOnce, "focus should be called once");
        assert(removeEventListenerSpy.withArgs("blur").calledOnce, "focus should be called once");
        assert(removeEventListenerSpy.withArgs("keyup").calledOnce, "focus should be called once");
        removeEventListenerSpy.restore();

        expect(inputComposite.input).to.be.null;
        expect(inputComposite.labelControl).to.be.null;
    });

    it("focus", function() {
        // Arrange
        inputComposite.labelControl = new ElementMockup();
        const setAttributeSpy = sinon.spy(inputComposite.labelControl, "setAttribute");

        // Act
        inputComposite.focus();

        // Assert
        assert(setAttributeSpy.withArgs("hasFocus", "true").calledOnce, "hasfocus with true should be called once");
        setAttributeSpy.restore();
    });

    it("blur", function() {
        // Arrange
        inputComposite.labelControl = new ElementMockup();
        const setAttributeSpy = sinon.spy(inputComposite.labelControl, "setAttribute");

        // Act
        inputComposite.blur();

        // Assert
        assert(setAttributeSpy.withArgs("hasFocus", "false").calledOnce, "hasfocus with false should be called once");
        setAttributeSpy.restore();
    });

    it("keyUp", function() {
        // Arrange
        inputComposite.input = new ElementMockup();
        inputComposite.labelControl = new ElementMockup();
        const checkValiditySpy = sinon.spy(inputComposite, "checkValidity");
        const setAttributeSpy = sinon.spy(inputComposite.labelControl, "setAttribute");

        // Act
        inputComposite.keyUp();

        // Assert
        assert(checkValiditySpy.calledOnce, "checkValidity should be called");
        checkValiditySpy.restore();

        assert(setAttributeSpy.withArgs("invalid").calledOnce);
        setAttributeSpy.restore();
    });

    it("descriptorChanged", function() {
        // Scenario 1
        inputComposite.descriptor = "";
        inputComposite.descriptorChanged();
        expect(inputComposite.hasDescriptor).to.be.false;

        // Scenario 2
        inputComposite.descriptor = "Hello World";
        inputComposite.descriptorChanged();
        expect(inputComposite.hasDescriptor).to.be.true;
    });
});
