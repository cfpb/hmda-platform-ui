jest.dontMock('../src/js/ValidationProgress.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var ValidationProgress = require('../src/js/ValidationProgress.jsx');
var api = require('../src/js/api');
var cb = jest.fn();

describe('ValidationProgress', function(){

  var progress = TestUtils.renderIntoDocument(<ValidationProgress initialCode={4} callback={cb}/>);
  var progressNode = ReactDOM.findDOMNode(progress);

  it('renders the component', function(){
    expect(progressNode).toBeDefined();
  });

  it('sets props and initial state appropriately', function(){
    expect(progress.props.initialCode).toEqual(4);
    expect(progress.state.statusCode).toEqual(4);
  });

  it('renders the correct amount of children', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(progress, 'p').length).toEqual(2);
  });

  var wrappedCb;
  api.getProgress = jest.fn(function(cb){
    wrappedCb = jest.fn(function(){cb({status: {code: 7, message: ''}})});
    setTimeout(wrappedCb, 0);
  });

  var progress2 = TestUtils.renderIntoDocument(<ValidationProgress initialCode={3} callback={cb}/>);
  var progressNode2 = ReactDOM.findDOMNode(progress);

  jest.runAllTimers();

  it('renders the component', function(){
    expect(progressNode2).toBeDefined();
  });

  it('sets props and initial state appropriately', function(){
    expect(progress2.props.initialCode).toEqual(3);
    expect(progress2.state.statusCode).toEqual(7);
  });

  it('renders the correct amount of children', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(progress2, 'p').length).toEqual(5);
  });

  it('calls the api', function(){
    expect(api.getProgress.mock.calls[0][0]).toBeDefined();
  });

  it('calls the api callback', function(){
    expect(wrappedCb).toBeCalled();
  });

  it('calls the provided callback with a status object', function(){
    expect(cb.mock.calls[0][0]).toEqual({status: {code: 7, message: ''}});
  });
});
