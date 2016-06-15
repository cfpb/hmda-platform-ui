jest.dontMock('../src/js/EditsQ595.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var EditsQ595 = require('../src/js/EditsQ595.jsx');
var fs = require('fs');

var edits = JSON.parse(fs.readFileSync('./server/json/q595.json'));

describe('Q595 edits', function(){
  var editsQ595 = TestUtils.renderIntoDocument(<EditsQ595 group={edits.edits}/>)
  var editsQ595Node = ReactDOM.findDOMNode(editsQ595);

  it('renders the editsQ595 component', function(){
    expect(editsQ595Node).toBeDefined();
  });

  it('passes through props', function(){
    expect(editsQ595.props.group).toEqual(edits.edits);
  });

  it('renders the radio button elements', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(editsQ595, 'input').length).toEqual(6);
  });
});
