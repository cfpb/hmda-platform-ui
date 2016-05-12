jest.dontMock('../src/js/AppContainer.jsx');
jest.dontMock('../src/js/UserSelect.jsx');
jest.dontMock('../src/js/UserHeading.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var AppContainer = require('../src/js/AppContainer.jsx');


describe('AppContainer', function(){

  var containerComponent = <AppContainer props={{params:{year: 2017}}}><span>A child></span></AppContainer>
  var container = TestUtils.renderIntoDocument(containerComponent);
  var containerNode = ReactDOM.findDOMNode(container);

  it('renders the component', function(){
    expect(containerNode).toBeDefined();
  });
});
