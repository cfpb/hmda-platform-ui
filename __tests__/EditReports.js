jest.dontMock('../src/js/EditReports.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var institution = {
  "name": "Wacky data",
  "status": 2,
  "editReports": [
    {
      "timestamp": 1457464448191,
      "edits": {
        "syntactical": 2,
        "validity": 1,
        "quality": 2,
        "macro": 1
      }
    },
    {
      "timestamp": 1451464448191,
      "edits": {
        "syntactical": 3,
        "validity": 2,
        "quality": 2,
        "macro": 7
      }
    }
  ]
}

var EditReports = require('../src/js/EditReports.jsx');


describe('edit reports', function(){

  var editReports = TestUtils.renderIntoDocument(<EditReports institution={institution}/>)
  var editReportsNode = ReactDOM.findDOMNode(editReports);

  it('renders the edit reports component', function(){
    expect(editReportsNode).toBeDefined();
  });

  it('passes through props appropriately', function(){
    expect(editReports.props.institution).toEqual(institution);
  });

  it('creates the correct number of links', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(editReports, 'li').length).toEqual(2);
  });
});
