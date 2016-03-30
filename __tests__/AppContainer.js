jest.dontMock('../src/js/AppContainer.jsx');
jest.dontMock('../src/js/UserSelect.jsx');
jest.dontMock('../src/js/UserHeading.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var AppContainer = require('../src/js/AppContainer.jsx');

var ChildDiv = React.createClass({
  render: function(){
    return <div className="childDiv">{this.props.institutions instanceof Array ? 'pass' : 'fail'}</div>
  }
});

describe('AppContainer', function(){

  var containerComponent = <AppContainer><ChildDiv/></AppContainer>
  var container = TestUtils.renderIntoDocument(containerComponent);
  var containerNode = ReactDOM.findDOMNode(container);
  var childDiv = TestUtils.findRenderedDOMComponentWithClass(container, 'childDiv');

  it('renders the component', function(){
    expect(containerNode).toBeDefined();
  });

  it('passes institutions as props to its children automatically', function(){
    expect(childDiv.innerHTML).toEqual('pass')
  });
});
