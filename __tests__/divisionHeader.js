jest.dontMock('../src/js/divisionHeader.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');


var divisionHeader = require('../src/js/divisionHeader.jsx');


describe('divisionHeader', function(){

  var headerComponent = React.createElement(divisionHeader, {text: 'testtext'});
  var header = TestUtils.renderIntoDocument(headerComponent);
  var headerNode = ReactDOM.findDOMNode(header);

  it('renders the header', function(){
    expect(headerNode).toBeDefined();
  });

  it('sets the text prop appropriately', function(){
    expect(header.props.text).toEqual('testtext');
  });

});
