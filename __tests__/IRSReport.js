jest.dontMock('../src/js/IRSReport.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var IRSReport = require('../src/js/IRSReport.jsx');

describe('irs report', function(){

  var irsReport = TestUtils.renderIntoDocument(<IRSReport/>)
  var irsReportNode = ReactDOM.findDOMNode(irsReport);

  it('renders the irs report component', function(){
    expect(irsReportNode).toBeDefined();
  });

  it('creates the correct number of rows', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(irsReport, 'tr').length).toEqual(2);
  });
});
