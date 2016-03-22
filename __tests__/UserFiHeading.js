jest.dontMock('../src/js/UserFiHeading.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');


var UserFiHeading = require('../src/js/UserFiHeading.jsx');

var user = 'User1';
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

describe('FiStatus', function(){

  var headingComponent = <UserFiHeading institution={{}} year='2017' user={user} />

  var heading = TestUtils.renderIntoDocument(headingComponent);
  var headingNode = ReactDOM.findDOMNode(heading);

  it('renders the component', function(){
    expect(headingNode).toBeDefined();
  });

  it('passes through the institution appropriately as props', function(){
    expect(heading.props.institution).toEqual({});
  });

  it('passes through the user appropriately as props', function(){
    expect(heading.props.user).toEqual(user);
  });

  it('passes through the year appropriately as props', function(){
    expect(heading.props.year).toEqual('2017');
  });

  it('renders correctly', function(){
    expect(headingNode.textContent).toEqual('Welcome to 2017 HMDA filing, User1');
  });

});
