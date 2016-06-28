jest.dontMock('../src/js/EditsGrouped.jsx');
jest.dontMock('../src/js/EditsDetail.jsx');

var fs = require('fs');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var EditsGrouped = require('../src/js/EditsGrouped.jsx');

var syntacticalObj = JSON.parse(fs.readFileSync('./server/json/syntactical.json'));

var appStatus = {get: jest.fn(), set: jest.fn()};

describe('EditsGrouped', function(){

  var syntacticalComponent = <EditsGrouped appStatus={appStatus} group={syntacticalObj.edits} groupByRow={false}/>
  var syntactical = TestUtils.renderIntoDocument(syntacticalComponent);
  var syntacticalNode = ReactDOM.findDOMNode(syntactical);

  it('renders the component', function(){
    expect(syntacticalNode).toBeDefined();
  });

  it('passes through the edits appropriately as props', function(){
    expect(syntactical.props.group).toEqual(syntacticalObj.edits);
  });

  it('properly renders needed child components', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithClass(syntactical, 'EditsSummary').length).toEqual(2);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(syntactical, 'EditsDetail').length).toEqual(2);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(syntactical, 'expandable').length).toEqual(2);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(syntactical, 'table-header').length).toEqual(2);
  });

  it('returns appropriate primary and secondary keys', function(){
    expect(syntactical.getPrimary({lar: {loanId: '1'}, edit: 'q1', lars: []})).toEqual('q1');
    expect(syntactical.getSecondary({lar: {loanId: '1'}, edit: 'q1', lars: []})).toEqual([]);
  });

  var syntacticalComponent2 = <EditsGrouped appStatus={appStatus} group={[{lar:{loanId: '1'}, edits:[{edit:'e1', type:'syntactical'}]},{lar:{loanId: '2'}, edits:[{edit:'e2', type:'syntactical'}]},{lar:{loanId: '3'}, edits:[{edit:'e3', type:'syntactical'}]}]} groupByRow={true}/>
  var syntactical2 = TestUtils.renderIntoDocument(syntacticalComponent2);
  var syntacticalNode2 = ReactDOM.findDOMNode(syntactical2);

  it('renders child components when sorted by row', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithClass(syntactical2, 'EditsSummary').length).toEqual(3);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(syntactical2, 'EditsDetail').length).toEqual(3);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(syntactical2, 'expandable').length).toEqual(3);
  });
  it('returns appropriate primary and secondary keys when grouping by row', function(){
    expect(syntactical2.getPrimary({lar: {loanId: '1'}, edits: []})).toEqual('1');
    expect(syntactical2.getSecondary({lar: {loanId: '1'}, edits: []})).toEqual([]);
  });
});
