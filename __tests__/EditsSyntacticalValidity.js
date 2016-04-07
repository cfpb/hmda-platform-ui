jest.dontMock('../src/js/EditsSyntacticalValidity.jsx');
jest.dontMock('../src/js/EditsDetail.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var EditsSyntacticalValidity = require('../src/js/EditsSyntacticalValidity.jsx');

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
        }
      ]
    }
  ]
}

describe('EditsSyntacticalValidity', function(){

  var syntacticalComponent = <EditsSyntacticalValidity id="syntactical" edits={edits.syntactical} />
  var syntactical = TestUtils.renderIntoDocument(syntacticalComponent);
  var syntacticalNode = ReactDOM.findDOMNode(syntactical);

  it('renders the component', function(){
    expect(syntacticalNode).toBeDefined();
  });

  it('renders the component with the correct id', function(){
    expect(syntacticalNode.getAttribute('id')).toEqual('syntactical');
  });

  it('passes through the edits appropriately as props', function(){
    expect(syntactical.props.edits).toEqual(edits.syntactical);
  });

  it('properly renders needed child components', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithClass(syntactical, 'EditsSummary').length).toEqual(2);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(syntactical, 'EditsDetail').length).toEqual(2);
  });

});
