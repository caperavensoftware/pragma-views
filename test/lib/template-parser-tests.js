
import {expect, assert} from 'chai';
import * as sinon from 'sinon';
import 'aurelia-polyfills';
import {TemplateParser} from './../../src/lib/template-parser';
import {populateTemplate} from './../../src/lib/template-parser-contstants';
import {templateSample} from './template-parse-sample';

describe('TemplateParser Tests', function() {
    let templateParser;

    beforeEach(function() {
        templateParser = new TemplateParser ();
    });
    
    it('constructor', function() {
        expect(templateParser).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => TemplateParser()).to.throw("Cannot call a class as a function");
    });

    it('parse', function() {
        const result = templateParser.parse(templateSample);
        expect(result).to.not.be.null;
    });

    it('setFieldMap', function() {
        // Arrange
        const fieldMap = templateSample.fields;

        // Act
        templateParser.setFieldMap(fieldMap);

        // Assert
        expect(templateParser.fieldMap.size).to.be.equal(2);
        expect(templateParser.fieldMap.get("code")).to.be.equal("code");
        expect(templateParser.fieldMap.get("site-code")).to.be.equal("site_code");
    });

    it('parseObject, null', function() {
        // Act
        const result = templateParser.parseObject();

        // Assert
        expect(result).to.be.false;
    });

    it('parseObject, known type', function() {
        // Arrange
        const knownTypeSpy = sinon.spy(templateParser, "parseKnown");

        const parseObject = {
            "input" : {
                "title": "Code",
                "field": "code",
                "element": "input",
                "attributes": {
                    "type": "text",
                    "data-lookup": "lookup"
                }
            }
        };

        // Act
        const result = templateParser.parseObject(parseObject);

        // Assert
        expect(result.length).to.above(0);

        assert(knownTypeSpy.calledOnce, "parseKnown should be called once");
        knownTypeSpy.restore();
    });

    it('parseObject, unknown type', function() {
        // Arrange
        const parseObjectSpy = sinon.spy(templateParser, "parseObject");

        const parseObject = {
            "whaat" : {
            }
        };

        // Act
        const result = templateParser.parseObject(parseObject);

        // Assert
        assert(parseObjectSpy.calledTwice, "parseObject should be called twice");
        parseObjectSpy.restore();
    });

    it('isKnownType', function () {
        // Act
        const result = templateParser.isKnownType("input");

        // Assert
        expect(result).to.be.true;
    });

    it('parseTabSheet', function() {
        // Arrange
        const tabs = [
            {
                "id": "tabHeader",
                "title": "Header",
                "groups": []
            },
            {
                "id": "tabHeader2",
                "title": "Header2",
                "groups": []
            }
        ];

        const parseTabsSpy = sinon.spy(templateParser, "parseTabs");

        // Act
        templateParser.parseTabSheet(tabs);

        // Assert
        assert(parseTabsSpy.calledOnce, "parse tabs should have been called twice");
        parseTabsSpy.restore();
    });

    it.skip('parseTabs', function() {
        // Arrange
        const tabs = [
            {
                "id": "tabHeader",
                "title": "Header",
                "groups": []
            },
            {
                "id": "tabHeader2",
                "title": "Header2",
                "groups": []
            }
        ];

        const parseGroupsSpy = sinon.spy(templateParser, "parseGroups");

        // Act
        templateParser.parseTabs(tabs);

        // Assert
        assert(parseGroupsSpy.calledTwice, "parse groups should have been called twice");
        parseGroupsSpy.restore();
    });

    it('parseGroups', function() {
        // Arrange
        const groups = [
            {
                "id": "group1",
                "title": "Group 1",
                "elements": [
                ]
            }
        ];

        const parseElementsSpy = sinon.spy(templateParser, "parseElements");

        // Act
        templateParser.parseGroups(groups);

        // Assert
        assert(parseElementsSpy.calledOnce, "should process three elements");
        parseElementsSpy.restore();
    });

    it('parseElements, null', function () {
        // Act
        const result = templateParser.parseElements(null);

        // Assert
        expect(result.length).to.equal(0);
    });

    it('parseElements', function() {
        // Arrange
        const elements = [
            {
                "title": "Code",
                "field": "code",
                "element": "input",
                "description": "max length of 50",
                "attributes": {
                    "type": "text",
                    "data-lookup": "lookup"
                }
            },
            {
                "title": "Notes",
                "field": "notes",
                "element": "memo"
            },
            {
                "title": "Site Code",
                "field": "site-code",
                "element": "container",
                "styles": ["class1", "class2"]
            }
        ];

        const parseElementSpy = sinon.spy(templateParser, "parseElement");

        // Act
        templateParser.parseElements(elements);

        // Assert
        assert(parseElementSpy.callCount === 3);
        parseElementSpy.restore();
    });

    it('parseInput', function() {
        // Arrange
        const input = {
            "title": "Code",
            "field": "code",
            "element": "input",
            "description": "max length of 50",
            "styles": ["class1", "class2"],
            "attributes": {
                "type": "text",
                "data-lookup": "lookup"
            }
        };

        // Act
        const result = templateParser.parseInput(input);

        // Assert
        assert(result.indexOf('id="code"') > 0);
        assert(result.indexOf('label="Code"') > 0);
        assert(result.indexOf('descriptor="max length of 50"') > 0);
        assert(result.indexOf('class="class1 class2"') > 0);
        assert(result.indexOf('type="text"') > 0);
        assert(result.indexOf('data-lookup="lookup"') > 0);
    });

    it('parseTextArea', function() {
        // Arrange
        const textarea = {
            "title": "Notes",
            "field": "notes",
            "element": "memo",
            "attributes": {
                "test": "testing"
            },
            "styles": ["c1"]
        };

        // Act
        const result = templateParser.parseTextArea(textarea);

        // Assert
        assert(result.indexOf('id="notes"') > 0);
        assert(result.indexOf('label="Notes"') > 0);
        assert(result.indexOf('descriptor=""') > 0);
        assert(result.indexOf('class="c1"') > 0);
        assert(result.indexOf('test="testing"') > 0);
    });

    it('parseButton', function() {
        // Arrange
        const button = {

        };

        // Act
        const result = templateParser.parseButton(button);

        // Asset
        console.log(result);
    });
});

describe('Template Parser Constants', function() {
   it.skip('populateTemplate');
});