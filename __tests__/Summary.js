jest.dontMock('../src/js/Summary.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var Summary = require('../src/js/Summary.jsx');

describe('Summary', function(){
  var summaryComponent = <Summary />

  var summary = TestUtils.renderIntoDocument(summaryComponent);
  var summaryNode = ReactDOM.findDOMNode(summary);

  it('renders the component', function(){
    expect(summaryNode).toBeDefined();
  });

  it('renders the correct description lists', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(summary, 'dl').length).toEqual(2);
  });

  it('renders the correct description terms', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(summary, 'dt').length).toEqual(10);
  });
});
