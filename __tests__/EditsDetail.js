jest.dontMock('../src/js/EditsDetail.jsx');
jest.dontMock('../src/js/EditsDetailRow.jsx');
jest.dontMock('../src/js/react-expandables');

var fs = require('fs');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var EditsDetail = require('../src/js/EditsDetail.jsx');

var syntacticalObj = JSON.parse(fs.readFileSync('./server/json/syntactical.json'));
var macroObj = JSON.parse(fs.readFileSync('./server/json/macro.json'));

var appStatus = {get: jest.fn(), set: jest.fn()};

describe('EditsDetail', function(){

  var syntacticalDetail = TestUtils.renderIntoDocument(<EditsDetail appStatus={appStatus} details={syntacticalObj.edits[0].lars}/>);
  var syntacticalNode = ReactDOM.findDOMNode(syntacticalDetail);

  it('renders the component', function(){
    expect(syntacticalNode).toBeDefined();
  });

  it('passes through the edits appropriately as props', function(){
    expect(syntacticalDetail.props.details).toEqual(syntacticalObj.edits[0].lars);
  });

  it('properly renders needed elements', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(syntacticalDetail, 'table').length).toEqual(1);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(syntacticalDetail, 'tr').length).toEqual(4);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(syntacticalDetail, 'td').length).toEqual(3);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(syntacticalDetail, 'expandable_content').length).toEqual(1);
  });

  var macroDetail = TestUtils.renderIntoDocument(<EditsDetail appStatus={appStatus} details={macroObj.edits}/>);
  var macroNode = ReactDOM.findDOMNode(macroDetail);

  it('renders the component', function(){
    expect(macroNode).toBeDefined();
  });

  it('passes through the edits appropriately as props', function(){
    expect(macroDetail.props.details).toEqual(macroObj.edits);
  });

  it('properly renders macro elements', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(macroDetail, 'table').length).toEqual(1);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(macroDetail, 'tr').length).toEqual(3);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(macroDetail, 'td').length).toEqual(6);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(macroDetail, 'textarea').length).toEqual(2);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(macroDetail, 'expandable_content').length).toEqual(1);
  });
});
