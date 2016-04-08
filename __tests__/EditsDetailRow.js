jest.dontMock('../src/js/EditsDetailRow.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var EditsDetailRow = require('../src/js/EditsDetailRow.jsx');

var syntaxEdit = {
  'id': 1,
  'desc': 'Here is a desc',
  'field': 'Year',
  'valueSubmitted': '1967'
};

var macroEdit = {
  'id': 3,
  'desc': 'macro desc',
  'justification': '',
  'verified': false
}

var WrapperTable = React.createClass({
  render: function() {
    return (<table><tbody>{this.props.children}</tbody></table>);
  }
});

describe('EditsDetailRow', function(){

  var syntaxRow = TestUtils.renderIntoDocument(<WrapperTable><EditsDetailRow edit={syntaxEdit}/></WrapperTable>);
  var syntaxNode = ReactDOM.findDOMNode(syntaxRow);

  it('renders the component', function(){
    expect(syntaxNode).toBeDefined();
  });

  it('properly renders needed elements', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(syntaxRow, 'td').length).toEqual(4);
  });


  var macroRow = TestUtils.renderIntoDocument(<WrapperTable><EditsDetailRow edit={macroEdit}/></WrapperTable>);
  var mr2 = TestUtils.renderIntoDocument(<WrapperTable><EditsDetailRow edit={macroEdit}/></WrapperTable>);
  var mr3 = TestUtils.renderIntoDocument(<WrapperTable><EditsDetailRow edit={macroEdit}/></WrapperTable>);
  var macroNode = ReactDOM.findDOMNode(macroRow);


  it('renders the component', function(){
    expect(macroNode).toBeDefined();
  });

  it('renders macro elements', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(macroRow, 'td').length).toEqual(4);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(macroRow, 'textarea').length).toEqual(1);
  });


  TestUtils.Simulate.change(
    TestUtils.scryRenderedDOMComponentsWithTag(mr2, 'textarea')[0],
    {target: {value: 'updated'}}
  )

  it('updates when the checkbox is clicked', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(mr2, 'td').length).toEqual(4);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(mr2, 'textarea')[0].value).toEqual('updated');
  });

  TestUtils.Simulate.change(
    TestUtils.scryRenderedDOMComponentsWithTag(mr3, 'input')[0],
    {target: {checked: true}}
  )

  it('updates when the checkbox is clicked', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(mr3, 'td').length).toEqual(4);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(mr3, 'textarea').length).toEqual(0);
  });
});
