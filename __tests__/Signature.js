jest.dontMock('../src/js/Signature.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var Signature = require('../src/js/Signature.jsx');
var api = require('../src/js/api');

var code = 13;
api.postSignature = jest.fn(function(cb){
  cb(null, {
    status: {
      code: code,
      message: ''
    },
    timestamp: Date.now(),
    receipt: 'dc9e5827abb678f54103e7b89435abf9b36648797ebb6516a52ab33ab4e46cee'
  });
  code = code === 13 ? 12 : 13;
});

describe('irs report', function(){

  function uncheckedToggle(err, status){
    expect(status.code).toBe(13);
  }

  var signature = TestUtils.renderIntoDocument(<Signature setAppStatus={uncheckedToggle} checked={false}/>)
  var signatureNode = ReactDOM.findDOMNode(signature);

  it('renders the signature component', function(){
    expect(signatureNode).toBeDefined();
  });

  it('contains the checkbox input', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithTag(signature, 'input').length).toEqual(1);
  });

  it('does NOT render the receipt and hash', function(){
    expect(TestUtils.scryRenderedDOMComponentsWithClass(signature, 'receipt').length).toEqual(0);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(signature, 'timestamp').length).toEqual(0);
  });

  it('toggles the unchecked checkbox to true', function(){
    var checkbox = TestUtils.findRenderedDOMComponentWithTag(signature, 'input');
    expect(checkbox.checked).toBeFalsy();

    TestUtils.Simulate.change(
      checkbox,
      {target: {checked: true}}
    );

    expect(TestUtils.findRenderedDOMComponentWithClass(signature, 'receipt')).toBeDefined();
    expect(TestUtils.findRenderedDOMComponentWithClass(signature, 'timestamp')).toBeDefined();
  });

  it('the checkbox IS checked and toggles to false', function(){

    function checkedToggle(err, status){
      expect(status.code).toBe(12);
    }

    var signatureChecked = TestUtils.renderIntoDocument(<Signature setAppStatus={checkedToggle} checked={true}/>);
    var checkbox = TestUtils.findRenderedDOMComponentWithTag(signatureChecked, 'input');
    expect(checkbox.checked).toBeTruthy();

    it('renders the receipt', function(){
      expect(TestUtils.findRenderedDOMComponentWithClass(signatureChecked, 'receipt')).toBeDefined();
      expect(TestUtils.findRenderedDOMComponentWithClass(signatureChecked, 'timestamp')).toBeDefined();
    });

    TestUtils.Simulate.change(
      checkbox,
      {target: {checked: false}}
    );

    it('does not render the receipt after toggle', function(){
      expect(TestUtils.scryRenderedDOMComponentsWithClass(signatureChecked, 'receipt').length).toEqual(0);
      expect(TestUtils.scryRenderedDOMComponentsWithClass(signatureChecked, 'timestamp').length).toEqual(0);
    });
  });

});
