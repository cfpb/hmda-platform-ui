jest.dontMock('../src/js/EditsSelector.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');


var EditsSelector = require('../src/js/EditsSelector.jsx');


describe('Edits Selector', function(){
  var cb = jest.fn();
  var selector = TestUtils.renderIntoDocument(<EditsSelector callback={cb}/>)
  var selectorNode = ReactDOM.findDOMNode(selector);

  it('renders the selector button', function(){
    expect(selectorNode).toBeDefined();
  });

  it('calls the selector callback when toggled', function(){
    expect(cb.mock.calls[0]).toBeDefined();
    expect(cb.mock.calls[0][0]).toEqual(false);
  });

  TestUtils.Simulate.click(
    TestUtils.findRenderedDOMComponentWithTag(selector, 'div')
  );

  it('calls the selector callback after a click', function(){
    expect(cb.mock.calls[1]).toBeDefined();
    expect(cb.mock.calls[1][0]).toEqual(true);
  });

});
