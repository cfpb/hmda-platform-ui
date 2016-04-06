jest.dontMock('../src/js/EditsSyntacticalValidityDetail.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var EditsSyntacticalValidityDetail = require('../src/js/EditsSyntacticalValidityDetail.jsx');

var edits = [
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
];

describe('EditsSyntacticalValidity', function(){

  var detailComponent = <EditsSyntacticalValidityDetail edits={edits} />
  var detail = TestUtils.renderIntoDocument(detailComponent);
  var detailNode = ReactDOM.findDOMNode(detail);

  it('renders the component', function(){
    expect(detailNode).toBeDefined();
  });

  it('passes through the edits appropriately as props', function(){
    expect(detail.props.edits).toEqual(edits);
  });

  it('properly renders needed elements', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(detail, 'table').length).toEqual(1);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(detail, 'tr').length).toEqual(3);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(detail, 'td').length).toEqual(8);
  });
});
