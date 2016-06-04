jest.dontMock('../src/js/InstitutionStatus.jsx');
jest.dontMock('../src/js/Resubmit.jsx');
jest.dontMock('../src/js/EditReports.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var InstitutionStatus = require('../src/js/InstitutionStatus.jsx');

var institution = {
  "name": "Wacky data",
  "id": "bankid",
  "status": {
    "code": 4,
    "message": ""
  },
  "currentSubmission": 2
}

var period = '2017';

describe('InstitutionStatus', function(){

  var statusComponent = <InstitutionStatus period={period} institution={institution}/>
  var status = TestUtils.renderIntoDocument(statusComponent);
  var statusNode = ReactDOM.findDOMNode(status);

  it('renders the component', function(){
    expect(statusNode).toBeDefined();
  });

  it('passes through the institution appropriately as props', function(){
    expect(status.props.institution).toEqual(institution);
  });

});
