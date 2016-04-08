jest.dontMock('../src/js/EditsContainer.jsx');
jest.dontMock('../src/js/EditsSyntacticalValidity.jsx');
jest.dontMock('../src/js/EditsDetail.jsx');
jest.dontMock('../src/js/EditsMacro.jsx');
jest.dontMock('../src/js/EditsHeaderDescription.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var EditsContainer = require('../src/js/EditsContainer.jsx');
var request = require('superagent');
var fs = require('fs');

var edits = fs.readFileSync('./src/js/data/edits.json');

request.get = jest.fn(function(){
  process.nextTick(function() {
    request.triggerEnd(null, {'text': edits});
  })
  return this;
});

request.end = jest.fn(function(callback) {
  request.triggerEnd = callback;
});

describe('EditsContainer', function() {
  var containerComponent = <EditsContainer />
  var container = TestUtils.renderIntoDocument(containerComponent);
  var containerNode = ReactDOM.findDOMNode(container);

  it('renders the component', function(){
    expect(containerNode).toBeDefined();
  });

  it('has the correct state for edits', function(){
    expect(container.state.edits.syntactical).toEqual([]);
  });

  it('properly renders child elements', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithClass(container, 'EditsHeaderDescription').length).toEqual(3);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(container, 'p').length).toEqual(4);
  });

  it('calls superagent.get', function() {
    jest.runAllTicks();
    var parsedEdits = JSON.parse(edits);
    expect(container.state.edits.syntactical).toEqual(parsedEdits.edits.syntactical);
    expect(container.state.edits.syntactical[0].loanNumber).not.toEqual('543234');
    expect(container.state.edits.validity).toEqual(parsedEdits.edits.validity);
  });
});
