jest.dontMock('../src/js/EditsQ029.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var EditsQ029 = require('../src/js/EditsQ029.jsx');
var fs = require('fs');

var edits = JSON.parse(fs.readFileSync('./server/json/q029.json'));

describe('Q029 edits', function(){
  var editsQ029 = TestUtils.renderIntoDocument(<EditsQ029 group={edits.edits}/>)
  var editsQ029Node = ReactDOM.findDOMNode(editsQ029);

  it('renders the editsQ029 component', function(){
    expect(editsQ029Node).toBeDefined();
  });

  it('passes through props', function(){
    expect(editsQ029.props.group).toEqual(edits.edits);
  });

  it('renders the radio button elements', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(editsQ029, 'input').length).toEqual(8);
  });
});
