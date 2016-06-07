jest.dontMock('../src/js/IRSReport.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var IRSReport = require('../src/js/IRSReport.jsx');
var fs = require('fs');
var api = require('../src/js/api');

var irsJSON = JSON.parse(fs.readFileSync('./server/json/irs.json'));

api.getIRS = jest.fn(function(cb){
  cb(irsJSON);
});

describe('irs report', function(){
  var changeHandlerTrue = function(e){
    expect(e.target.checked).toBeTruthy();
  };

  var changeHandlerFalse = function(e){
    expect(e.target.checked).toBeFalsy();
  };


  var irsReport = TestUtils.renderIntoDocument(<IRSReport clicked={changeHandlerTrue}/>);
  var irsReportNode = ReactDOM.findDOMNode(irsReport);

  it('renders the irs report component', function(){
    expect(irsReportNode).toBeDefined();
  });

  it('creates the correct number of rows', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(irsReport, 'tr').length).toEqual(4);
  });

  it('contains the checkbox input', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(irsReport, 'input').length).toEqual(1);
  });

  it('the checkbox is NOT checked and toggles to true', function(){
    var checkbox = TestUtils.findRenderedDOMComponentWithTag(irsReport, 'input');
    expect(checkbox.checked).toBeFalsy();

    TestUtils.Simulate.change(
      checkbox,
      {"target": {"checked": true}}
    );
  });

  it('the checkbox IS checked and toggles to false', function(){
    var irsReportChecked = TestUtils.renderIntoDocument(<IRSReport clicked={changeHandlerFalse} checked='checked'/>);
    var irsReportCheckedNode = ReactDOM.findDOMNode(irsReport);
    var checkbox = TestUtils.findRenderedDOMComponentWithTag(irsReportChecked, 'input');
    expect(checkbox.checked).toBeTruthy();

    TestUtils.Simulate.change(
      checkbox,
      {"target": {"checked": false}}
    );
  });
});
