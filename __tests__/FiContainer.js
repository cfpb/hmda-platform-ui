jest.dontMock('../src/js/FiContainer.jsx');
jest.dontMock('../src/js/CbLink.jsx');
jest.dontMock('../src/js/FiStatus.jsx');
jest.dontMock('../src/js/DivisionHeader.jsx');
jest.dontMock('../src/js/data/institutions.js');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var FiContainer = require('../src/js/FiContainer.jsx');
var institutions = require('../src/js/data/institutions.js').user1;

describe('FiContainer', function(){

  var containerComponent = <FiContainer institutions={[]}/>
  var container = TestUtils.renderIntoDocument(containerComponent);
  var containerNode = ReactDOM.findDOMNode(container);

  it('renders the component', function(){
    expect(containerNode).toBeDefined();
  });

  it('passes through the institutions appropriately as props', function(){
    expect(container.props.institutions).toEqual([]);
  });


  it('properly renders needed child components', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithClass(container, 'division').length).toEqual(3);

  });

  var dataContainerComponent = <FiContainer institutions={institutions}/>
  var dataContainer = TestUtils.renderIntoDocument(dataContainerComponent);
  var dataContainerNode = ReactDOM.findDOMNode(dataContainer);

  it('renders the dataComponent', function(){
    expect(dataContainerNode).toBeDefined();
  });

  it('passes through the institutions appropriately as props', function(){
    expect(dataContainer.props.institutions).toEqual(institutions);
  });

  it('properly renders updated components', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithClass(dataContainer, 'division').length).toEqual(3);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(dataContainer, 'h2').length).toEqual(3);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(dataContainer, 'institution').length).toEqual(6);
  });
});
