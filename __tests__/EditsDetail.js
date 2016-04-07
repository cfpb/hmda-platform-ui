/*
jest.dontMock('../src/js/EditsDetail.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var EditsDetail = require('../src/js/EditsDetail.jsx');

var edits = {
  syntax:[
    {
      'id': 1,
      'desc': 'Here is a desc',
      'field': 'Year',
      'valueSubmitted': '1967'
    }, {
      'id': 2,
      'desc': 'Here is another desc',
      'field': 'Year',
      'valueSubmitted': '1800'
    }
  ],
  macro:[
    {
      'id': 3,
      'desc': 'macro desc',
      'justification': '',
      'verified': false
    },
    {
      'id': 4,
      'desc': 'macro desc verified',
      'justification': 'Who cares',
      'verified': true
    }
  ]
}

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
*/
