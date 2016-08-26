jest.dontMock('../src/js/EditsDetail.jsx');
jest.dontMock('../src/js/EditsDetailRow.jsx');
jest.dontMock('../src/js/Multicheck.jsx');

var fs = require('fs');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var EditsDetail = require('../src/js/EditsDetail.jsx');
var api = require('../src/js/api');

var syntacticalObj = JSON.parse(fs.readFileSync('./server/json/syntactical.json'));
var qualityObj = JSON.parse(fs.readFileSync('./server/json/quality.json'));
var macroObj = JSON.parse(fs.readFileSync('./server/json/macro.json'));

var appStatus = {get: jest.fn(), set: jest.fn()};
api.putEdit = jest.fn();

describe('EditsDetail', function(){

  var syntacticalDetail = TestUtils.renderIntoDocument(<EditsDetail appStatus={appStatus} label={syntacticalObj.edits[0].edit} details={syntacticalObj.edits[0]}/>);
  var syntacticalNode = ReactDOM.findDOMNode(syntacticalDetail);

  it('renders the component', function(){
    expect(syntacticalNode).toBeDefined();
  });

  it('passes through the edits appropriately as props', function(){
    expect(syntacticalDetail.props.details).toEqual(syntacticalObj.edits[0]);
  });

  it('properly renders needed elements', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(syntacticalDetail, 'table').length).toEqual(1);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(syntacticalDetail, 'tr').length).toEqual(4);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(syntacticalDetail, 'td').length).toEqual(3);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(syntacticalDetail, 'expandable_content').length).toEqual(1);
  });


  var qualityDetail = TestUtils.renderIntoDocument(<EditsDetail appStatus={appStatus} label={qualityObj.edits[0].edit} details={qualityObj.edits[0]}/>);
  var qualityNode = ReactDOM.findDOMNode(qualityDetail);
  var checkbox = TestUtils.findRenderedDOMComponentWithTag(qualityDetail, 'input');

  it('renders the component', function(){
    expect(qualityNode).toBeDefined();
  });

  it('passes through the edits appropriately as props', function(){
    expect(qualityDetail.props.details).toEqual(qualityObj.edits[0]);
  });

  it('properly renders needed elements', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(qualityDetail, 'table').length).toEqual(1);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(qualityDetail, 'tr').length).toEqual(5);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(qualityDetail, 'td').length).toEqual(4);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(qualityDetail, 'expandable_content').length).toEqual(1);
    /*single checkbox for quality*/
    expect(checkbox).toBeDefined();
  });

  TestUtils.Simulate.change(
    checkbox,
    {target: {checked: true}}
  );

  it('calls putEdit on the API when the quality check is checked', function(){
    expect(api.putEdit).toBeCalled();
  });


  var macroDetail = TestUtils.renderIntoDocument(<EditsDetail appStatus={appStatus} details={macroObj}/>);
  var macroNode = ReactDOM.findDOMNode(macroDetail);

  it('renders the component', function(){
    expect(macroNode).toBeDefined();
  });

  it('passes through the edits appropriately as props', function(){
    expect(macroDetail.props.details).toEqual(macroObj);
  });

  it('properly renders macro elements', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(macroDetail, 'table').length).toEqual(1);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(macroDetail, 'tr').length).toEqual(3);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(macroDetail, 'td').length).toEqual(4);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(macroDetail, 'input').length).toEqual(6);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(macroDetail, 'expandable_content').length).toEqual(1);
  });
});
