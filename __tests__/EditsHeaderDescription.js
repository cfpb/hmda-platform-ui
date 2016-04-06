jest.dontMock('../src/js/EditsHeaderDescription.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var EditsHeaderDescription = require('../src/js/EditsHeaderDescription.jsx');

describe('EditsHeaderDescription', function(){

  var headerComponent = <EditsHeaderDescription>Syntactical</EditsHeaderDescription>;
  var header = TestUtils.renderIntoDocument(headerComponent);
  var headerNode = ReactDOM.findDOMNode(header);

  it('renders the header', function(){
    expect(headerNode).toBeDefined();
  });

  it('sets the prop appropriately', function(){
    expect(header.props.children).toEqual('Syntactical');
  });

  it('correctly sets the desc', function(){
    expect(header.getDescription('Syntactical')).toEqual('This is the syntactical description.')
  });

});
