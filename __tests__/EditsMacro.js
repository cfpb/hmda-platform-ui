jest.dontMock('../src/js/EditsMacro.jsx');
jest.dontMock('../src/js/EditsDetail.jsx');
jest.dontMock('cf-expandables');
jest.dontMock('jquery');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var EditsMacro = require('../src/js/EditsMacro.jsx');

var edits = {
 "macro": {
    "edits": [
      {
        "id": 1,
        "desc": "Here is a desc",
        "justification":"",
        "verified":false
      }, {
        "id": 2,
        "desc": "Here is another desc",
        "justification": "Why not",
        "verified": true
      }
    ]
  }
}

describe('EditsMacro', function(){

  var macro = TestUtils.renderIntoDocument(<EditsMacro id="macro" edits={edits.macro} />);
  var macroNode = ReactDOM.findDOMNode(macro);

  it('renders the component', function(){
    expect(macroNode).toBeDefined();
  });

  it('renders the component with the correct id', function(){
    expect(macroNode.getAttribute('id')).toEqual('macro');
  });

  it('passes through the edits appropriately as props', function(){
    expect(macro.props.edits).toEqual(edits.macro);
  });

  it('properly renders needed child components', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithClass(macro, 'EditsMacro').length).toEqual(1);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(macro, 'EditsDetail').length).toEqual(1);
  });

});
