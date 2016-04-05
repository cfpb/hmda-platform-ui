jest.dontMock('../src/js/EditsContainer.jsx');
jest.dontMock('../src/js/EditsSyntacticalValidity.jsx');
jest.dontMock('../src/js/EditsHeaderDescription.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var EditsContainer = require('../src/js/EditsContainer.jsx');

var edits = {
  "syntactical": [
    {
      "loanNumber": "123455",
      "edits": [
        {
          "id": 1,
          "desc": "Here is a desc",
          "field": "Year",
          "valueSubmitted": "1967"
        }, {
          "id": 2,
          "desc": "Here is another desc",
          "field": "Year",
          "valueSubmitted": "1800"
        }, {
          "id": 3,
          "desc": "Here is another desc",
          "field": "Year",
          "valueSubmitted": "1800"
        }
      ]
    },
    {
      "loanNumber": "09876",
      "edits": [
        {
          "id": 1,
          "desc": "Here is a desc",
          "field": "Year",
          "valueSubmitted": "1967"
        }, {
          "id": 2,
          "desc": "Here is another desc",
          "field": "Year",
          "valueSubmitted": "1800"
        }
      ]
    }
  ],
  "validity": [
    {
      "loanNumber": "123455",
      "edits": [
        {
          "id": 1,
          "desc": "Here is a desc",
          "field": "Year",
          "valueSubmitted": "1967"
        }, {
          "id": 2,
          "desc": "Here is another desc",
          "field": "Year",
          "valueSubmitted": "1800"
        }, {
          "id": 3,
          "desc": "Here is another desc",
          "field": "Year",
          "valueSubmitted": "1800"
        }
      ]
    },
    {
      "loanNumber": "09876",
      "edits": [
        {
          "id": 1,
          "desc": "Here is a desc",
          "field": "Year",
          "valueSubmitted": "1967"
        }, {
          "id": 2,
          "desc": "Here is another desc",
          "field": "Year",
          "valueSubmitted": "1800"
        }
      ]
    }
  ]
}

describe('EditsContainer', function(){

  var containerComponent = <EditsContainer />
  var container = TestUtils.renderIntoDocument(containerComponent);
  var containerNode = ReactDOM.findDOMNode(container);

  it('renders the component', function(){
    expect(containerNode).toBeDefined();
  });

  it('has the correct state for edits', function(){
    expect(container.state.edits).toEqual(edits);
  });

  it('properly renders child elements', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithClass(container, 'EditsHeaderDescription').length).toEqual(2);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(container, 'p').length).toEqual(3);
  });
});
