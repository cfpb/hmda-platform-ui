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

  it('renders the component and its children after polling', function(){

    var progress2 = TestUtils.renderIntoDocument(<ValidationProgress initialCode={3} callback={cb}/>);
    var progressNode2 = ReactDOM.findDOMNode(progress);

    expect(progressNode2).toBeDefined();

    expect(progress2.props.initialCode).toEqual(3);
    expect(progress2.state.statusCode).toEqual(3);

    expect(TestUtils.scryRenderedDOMComponentsWithTag(progress2, 'p').length).toEqual(1);

    expect(setTimeout).toBeCalled();

    //do polling; calls mocked api.getProgress
    jest.runAllTimers();

    expect(wrappedCb).toBeCalled();

    expect(TestUtils.scryRenderedDOMComponentsWithTag(progress2, 'p').length).toEqual(5);
    expect(cb.mock.calls[cb.mock.calls.length - 1][0]).toEqual({status: {code: 7, message: ''}});
  });
});
