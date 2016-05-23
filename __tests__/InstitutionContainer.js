jest.dontMock('../src/js/InstitutionContainer.jsx');
jest.dontMock('../src/js/Resubmit.jsx');
jest.dontMock('../src/js/EditReports.jsx');
jest.dontMock('../src/js/InstitutionStatus.jsx');
jest.dontMock('../src/js/DivisionHeader.jsx');
jest.dontMock('../src/js/api.js');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var superagent = require('superagent');
var fs = require('fs');

var InstitutionContainer = require('../src/js/InstitutionContainer.jsx');
var institutionString = fs.readFileSync('./server/json/user1-institutions.json');

superagent.get = jest.genMockFn().mockReturnThis();
superagent.end = jest.genMockFn().mockImpl(function(fn){
  return fn(null, {text: institutionString});
});

describe('InstitutionContainer', function(){

  var containerComponent = <InstitutionContainer/>
  var container = TestUtils.renderIntoDocument(containerComponent);
  var containerNode = ReactDOM.findDOMNode(container);

  it('renders the component', function(){
    expect(containerNode).toBeDefined();
  });

  it('properly renders needed child components', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithClass(container, 'division').length).toEqual(3);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(container, 'DivisionHeader').length).toEqual(3);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(container, 'InstitutionStatus').length).toEqual(6);
  });

});
