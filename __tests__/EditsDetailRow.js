jest.dontMock('../src/js/EditsDetailRow.jsx');
jest.dontMock('../src/js/Multicheck.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var EditsDetailRow = require('../src/js/EditsDetailRow.jsx');

var appStatus = {
  get: jest.fn(),
  set: jest.fn()
};

var larDetail = {
  lar: {loanId: 's1'}
};

var macroDetail= {
  edit: 'm1',
  justifications: [{
    text: 'oi',
    selected: false
  }]
};


var WrapperTable = React.createClass({
  render: function() {
    return (<table><tbody>{this.props.children}</tbody></table>);
  }
});

describe('EditsDetailRow', function(){

  var larRow = TestUtils.renderIntoDocument(<WrapperTable><EditsDetailRow appStatus={appStatus} detail={larDetail}/></WrapperTable>);
  var larNode = ReactDOM.findDOMNode(larRow);

  it('renders the component', function(){
    expect(larNode).toBeDefined();
  });

  it('properly renders needed elements', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(larRow, 'td').length).toEqual(1);
  });

  var macroRow = TestUtils.renderIntoDocument(<WrapperTable><EditsDetailRow appStatus={appStatus} detail={macroDetail}/></WrapperTable>);
  var macroNode = ReactDOM.findDOMNode(macroRow);


  it('renders the component', function(){
    expect(macroNode).toBeDefined();
  });

  it('renders macro elements', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(macroRow, 'td').length).toEqual(2);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(macroRow, 'input').length).toEqual(1);
  });

});

