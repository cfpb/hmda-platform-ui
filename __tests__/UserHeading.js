jest.dontMock('../src/js/UserHeading.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');


var UserHeading = require('../src/js/UserHeading.jsx');

var user = 'User1';
var institution = "Wacky data";
var period = '2017';

describe('UserHeading', function(){
  describe('render without institution', function() {

    var headingComponent = <UserHeading userName={user} period={period}/>

    var heading = TestUtils.renderIntoDocument(headingComponent);
    var headingNode = ReactDOM.findDOMNode(heading);

    it('renders the component', function(){
      expect(headingNode).toBeDefined();
    });

    it('passes through the user appropriately as props', function(){
      expect(heading.props.userName).toEqual(user);
    });

    it('renders correctly', function(){
      expect(headingNode.textContent).toEqual('Welcome to the 2017 HMDA filing, User1');
    });
  });

  describe('render with institution', function() {

    var headingComponent = <UserHeading institution={institution} userName={user} period={period} />

    var heading = TestUtils.renderIntoDocument(headingComponent);
    var headingNode = ReactDOM.findDOMNode(heading);

    it('renders the component', function(){
      expect(headingNode).toBeDefined();
    });

    it('passes through the institution appropriately as props', function(){
      expect(heading.props.institution).toEqual("Wacky data");
    });

    it('renders correctly', function(){
      expect(headingNode.textContent).toEqual('User1 filing on behalf of Wacky data');
    });
  });
});
