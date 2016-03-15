jest.dontMock('../src/js/cbLink.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');


var cbLink = require('../src/js/cbLink.jsx');

var cb = jest.genMockFn();

describe('cbLink', function(){

  var linkComponent = React.createElement(cbLink, {text: 'testtext', callback: cb});
  var link = TestUtils.renderIntoDocument(linkComponent);
  var linkNode = ReactDOM.findDOMNode(link);

  it('renders the link', function(){
    expect(linkNode).toBeDefined();
  });

  it('sets the props appropriately', function(){
    expect(link.props.callback).toEqual(cb);
    expect(link.props.text).toEqual('testtext');
  });

  TestUtils.Simulate.click(linkNode);

  it('calls the passed callback when clicked', function(){
    expect(cb.mock.calls.length).toEqual(1);
  });
});
