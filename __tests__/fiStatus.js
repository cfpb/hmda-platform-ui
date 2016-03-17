jest.dontMock('../src/js/fiStatus.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');


var fiStatus = require('../src/js/fiStatus.jsx');

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
    }
  ]
}

describe('fiStatus', function(){

  var statusComponent = React.createElement(fiStatus, {institution: institution});

  var status = TestUtils.renderIntoDocument(statusComponent);
  var statusNode = ReactDOM.findDOMNode(status);

  it('renders the component', function(){
    expect(statusNode).toBeDefined();
  });

  it('passes through the institution appropriately as props', function(){
    expect(status.props.institution).toEqual(institution);
  });

  it('sets initial state correctly', function(){
    expect(status.state).toEqual(institution);
  });

  it('correctly computes dates', function(){
    expect(status.getStartTime(institution.editReports[0])).toEqual('Filing started on Mar 08 2016.');
  });

  it('properly renders needed child components', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithClass(status, 'cbLink').length).toEqual(3);
    expect(TestUtils.findRenderedDOMComponentWithClass(status, 'resubmitComponent')).toBeDefined();
    expect(TestUtils.findRenderedDOMComponentWithClass(status, 'editReportsWrapper')).toBeDefined();
  });

});
