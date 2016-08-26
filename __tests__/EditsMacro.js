jest.dontMock('../src/js/EditsMacro.jsx');
jest.dontMock('../src/js/EditsDetail.jsx');

var fs = require('fs');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var EditsMacro = require('../src/js/EditsMacro.jsx');

var appStatus = {get: jest.fn(), set: jest.fn()};

var edits = JSON.parse(fs.readFileSync('./server/json/macro.json'));

describe('EditsMacro', function(){

  var macro = TestUtils.renderIntoDocument(<EditsMacro appStatus={appStatus} edits={edits}/>);
  var macroNode = ReactDOM.findDOMNode(macro);

  it('renders the component', function(){
    expect(macroNode).toBeDefined();
  });

  it('passes through props', function(){
    expect(macro.props.edits).toEqual(edits);
  });

  it('properly renders needed child components', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithClass(macro, 'EditsMacro').length).toEqual(1);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(macro, 'EditsDetail').length).toEqual(1);
  });

});
