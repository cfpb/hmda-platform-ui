jest.dontMock('../src/js/HomeLink.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');


var HomeLink = require('../src/js/HomeLink.jsx');


describe('home link', function(){

  var homeLink = TestUtils.renderIntoDocument(<HomeLink/>)
  var linkNode = ReactDOM.findDOMNode(homeLink);

  it('renders the link into the document', function(){
    expect(linkNode).toBeDefined();
  });
});
