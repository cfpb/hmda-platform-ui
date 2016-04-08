jest.dontMock('../src/js/EditsDetail.jsx');
jest.dontMock('../src/js/EditsDetailRow.jsx');

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

describe('EditsDetail', function(){

  var syntaxDetail = TestUtils.renderIntoDocument(<EditsDetail edits={edits.syntax}/>);
  var syntaxNode = ReactDOM.findDOMNode(syntaxDetail);

  it('renders the component', function(){
    expect(syntaxNode).toBeDefined();
  });

  it('passes through the edits appropriately as props', function(){
    expect(syntaxDetail.props.edits).toEqual(edits.syntax);
  });

  it('properly renders needed elements', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(syntaxDetail, 'table').length).toEqual(1);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(syntaxDetail, 'tr').length).toEqual(3);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(syntaxDetail, 'td').length).toEqual(8);
  });

  var macroDetail = TestUtils.renderIntoDocument(<EditsDetail edits={edits.macro}/>);
  var macroNode = ReactDOM.findDOMNode(macroDetail);

  it('renders the component', function(){
    expect(macroNode).toBeDefined();
  });

  it('passes through the edits appropriately as props', function(){
    expect(macroDetail.props.edits).toEqual(edits.macro);
  });

  it('properly renders needed elements', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(macroDetail, 'table').length).toEqual(1);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(macroDetail, 'tr').length).toEqual(3);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(macroDetail, 'td').length).toEqual(8);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(macroDetail, 'textarea').length).toEqual(1);
  });
});
