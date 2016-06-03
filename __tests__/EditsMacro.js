jest.dontMock('../src/js/EditsMacro.jsx');
jest.dontMock('../src/js/EditsDetail.jsx');
jest.dontMock('../src/js/react-expandables');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var EditsMacro = require('../src/js/EditsMacro.jsx');

var edits = {
 "macro": {
    "type": "macro",
    "edits": [
      {
        "edit": 'm1',
        "verification": ""
      }, {
        "id": 2,
        "verification": "Why not" 
      }
    ]
  }
}

describe('EditsMacro', function(){

  var macro = TestUtils.renderIntoDocument(<EditsMacro id="macro" group={edits.macro.edits} />);
  var macroNode = ReactDOM.findDOMNode(macro);

  it('renders the component', function(){
    expect(macroNode).toBeDefined();
  });

  it('passes through props', function(){
    expect(macro.props.group).toEqual(edits.macro.edits);
  });

  it('properly renders needed child components', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithClass(macro, 'EditsMacro').length).toEqual(1);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(macro, 'EditsDetail').length).toEqual(1);
  });

});
