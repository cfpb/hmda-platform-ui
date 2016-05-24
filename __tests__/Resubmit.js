jest.dontMock('../src/js/Resubmit.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');


var Resubmit = require('../src/js/Resubmit.jsx');


describe('resubmit', function(){

  var period = '2017';
  var submission = 2;
  var id = 'bankid';

  var resubmit = TestUtils.renderIntoDocument(<Resubmit period={period} submission={submission} id={id}/>)
  var resubmitNode = ReactDOM.findDOMNode(resubmit);

  it('renders the resubmit component', function(){
    expect(resubmitNode).toBeDefined();
  });

  it('passes through props appropriately', function(){
    expect(resubmit.props.period).toEqual(period);
    expect(resubmit.props.submission).toEqual(submission);
    expect(resubmit.props.id).toEqual(id);
  });
});
