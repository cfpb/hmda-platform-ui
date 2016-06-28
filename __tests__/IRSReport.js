jest.dontMock('../src/js/IRSReport.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var IRSReport = require('../src/js/IRSReport.jsx');
var fs = require('fs');
var api = require('../src/js/api');

var irsJSON = JSON.parse(fs.readFileSync('./server/json/irs.json'));

api.getIRS = jest.fn(function(cb){
  cb(null, irsJSON);
});

api.postIRS = jest.fn(function(cb, data){
  var code = data.verified ? 11 : 10;
  cb(null, {status: {code: code, message: ''}});
});

describe('irs report', function(){

  function uncheckedToggle(err, status){
    expect(status.status.code).toBe(11);
  }

  var irsReport = TestUtils.renderIntoDocument(<IRSReport checked={false} appStatus={{set:uncheckedToggle}}/>);
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

  it('toggles an unchecked checkbox to checked', function(){

    var checkbox = TestUtils.findRenderedDOMComponentWithTag(irsReport, 'input');
    expect(checkbox.checked).toBeFalsy();

    TestUtils.Simulate.change(
      checkbox,
      {'target': {'checked': true}}
    );
  });

  it('toggles a checked checkbox to unchecked', function(){

    function checkedToggle(err, status){
      expect(status.status.code).toBe(10);
    }

    var irsReportChecked = TestUtils.renderIntoDocument(<IRSReport checked={true} appStatus={{set: checkedToggle}}/>);
    var checkbox = TestUtils.findRenderedDOMComponentWithTag(irsReportChecked, 'input');
    expect(checkbox.checked).toBeTruthy();

    TestUtils.Simulate.change(
      checkbox,
      {'target': {'checked': false}}
    );
  });
});
