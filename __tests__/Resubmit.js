jest.dontMock('../src/js/Resubmit.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');


var Resubmit = require('../src/js/Resubmit.jsx');


describe('resubmit', function(){

  var resubmit = TestUtils.renderIntoDocument(<Resubmit institution={{name:'test'}}/>)
  var resubmitNode = ReactDOM.findDOMNode(resubmit);

  it('renders the resubmit component', function(){
    expect(resubmitNode).toBeDefined();
  });

  it('passes through props appropriately', function(){
    expect(resubmit.props.institution.name).toEqual('test');
  });
});
