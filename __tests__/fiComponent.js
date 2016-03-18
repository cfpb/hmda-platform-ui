jest.dontMock('../src/js/fiContainer.jsx');
jest.dontMock('../src/js/data/institutions.js');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var fiContainer = require('../src/js/fiContainer.jsx');
var institutions = require('../src/js/data/institutions.js').user1;

describe('fiContainer', function(){

  var containerComponent = React.createElement(fiContainer, {institutions: []});

  var container = TestUtils.renderIntoDocument(containerComponent);
  var containerNode = ReactDOM.findDOMNode(container);

  it('renders the component', function(){
    expect(containerNode).toBeDefined();
  });

  it('passes through the institutions appropriately as props', function(){
    expect(container.props.institutions).toEqual([]);
  });

  it('sets initial state correctly', function(){
    var divisions = container.state.divisions;
        
    expect(divisions[0]).toEqual({text: 'Not Started', institutions: []});
    expect(divisions[1]).toEqual({text: 'In Progress', institutions: []});
    expect(divisions[2]).toEqual({text: 'Completed', institutions: []});
  });

  it('properly renders needed child components', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithClass(container, 'divisionWrapper').length).toEqual(3);

    container.updateInstitutions(institutions);
  });


  it('properly renders updated components', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithClass(container, 'divisionWrapper').length).toEqual(3);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(container, 'divisionHeader').length).toEqual(3);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(container, 'fiStatus').length).toEqual(6);


  });
  it('captures updated state', function(){
    var divisions = container.state.divisions;

    expect(divisions[0].institutions.length).toEqual(1);
    expect(divisions[1].institutions.length).toEqual(4);
    expect(divisions[2].institutions.length).toEqual(1);
  });
});
