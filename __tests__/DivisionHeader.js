jest.dontMock('../src/js/DivisionHeader.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');


var DivisionHeader = require('../src/js/DivisionHeader.jsx');


describe('divisionHeader', function(){

  var headerComponent = <DivisionHeader>testtext</DivisionHeader>;
  var header = TestUtils.renderIntoDocument(headerComponent);
  var headerNode = ReactDOM.findDOMNode(header);

  it('renders the header', function(){
    expect(headerNode).toBeDefined();
  });

  it('sets the text prop appropriately', function(){
    expect(header.props.children).toEqual('testtext');
  });

});
