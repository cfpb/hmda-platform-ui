jest.dontMock('../src/js/UserHeading.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');


var UserHeading = require('../src/js/UserHeading.jsx');

var user = 'User1';
var institution = {
  "name": "Wacky data",
  "status": 2
}

describe('UserHeading', function(){
  describe('render without institution', function() {

    var headingComponent = <UserHeading institution={{}} user={user} />

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

    it('renders correctly', function(){
      expect(headingNode.textContent).toEqual('Welcome to HMDA filing, User1');
    });
  });

  describe('render with institution', function() {

    var headingComponent = <UserHeading institution={institution} user={user} />

    var heading = TestUtils.renderIntoDocument(headingComponent);
    var headingNode = ReactDOM.findDOMNode(heading);

    it('renders the component', function(){
      expect(headingNode).toBeDefined();
    });

    it('passes through the institution appropriately as props', function(){
      expect(heading.props.institution).toEqual({
        "name": "Wacky data",
        "status": 2
      });
    });

    it('renders correctly', function(){
      expect(headingNode.textContent).toEqual('User1 filing on behalf of Wacky data');
    });
  });
});
