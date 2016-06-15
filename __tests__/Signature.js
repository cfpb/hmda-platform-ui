jest.dontMock('../src/js/Signature.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var Signature = require('../src/js/Signature.jsx');
var fs = require('fs');
var api = require('../src/js/api');

api.postSignature = jest.fn(function(cb){
  cb(null, {
    status: {
      code: state,
      message: ""
    },
    timestamp: Date.now(),
    receipt: 'somehash'
  });
});

describe('irs report', function(){
  var changeHandlerTrue = function(e){
    expect(e.target.checked).toBeTruthy();
  };

  var changeHandlerFalse = function(e){
    expect(e.target.checked).toBeFalsy();
  };

  var signature = TestUtils.renderIntoDocument(<Signature clicked={changeHandlerTrue}/>)
  var signatureNode = ReactDOM.findDOMNode(signature);

  var signatureChecked = TestUtils.renderIntoDocument(<Signature clicked={changeHandlerFalse} checked='checked' receipt="somehash" timestamp={1457494448191}/>);
  var signatureCheckedNode = ReactDOM.findDOMNode(signatureChecked);

  it('renders the signature component', function(){
    expect(signatureNode).toBeDefined();
  });

  it('contains the checkbox input', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(signature, 'input').length).toEqual(1);
  });

  it('the checkbox is NOT checked and toggles to true', function(){
    var checkbox = TestUtils.findRenderedDOMComponentWithTag(signature, 'input');
    expect(checkbox.checked).toBeFalsy();

    TestUtils.Simulate.change(
      checkbox,
      {"target": {"checked": true}}
    );
  });

  it('does NOT render the receipt and hash', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithClass(signature, 'receipt').length).toEqual(0);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(signature, 'timestamp').length).toEqual(0);
  });

  it('the checkbox IS checked and toggles to false', function(){
    var checkbox = TestUtils.findRenderedDOMComponentWithTag(signatureChecked, 'input');
    expect(checkbox.checked).toBeTruthy();

    TestUtils.Simulate.change(
      checkbox,
      {"target": {"checked": false}}
    );
  });

  it('renders the receipt', function(){
    expect(TestUtils.findRenderedDOMComponentWithClass(signatureChecked, 'receipt')).toBeDefined();
    expect(TestUtils.findRenderedDOMComponentWithClass(signatureChecked, 'timestamp')).toBeDefined();
  });
});
