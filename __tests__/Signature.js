jest.dontMock('../src/js/Signature.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var Signature = require('../src/js/Signature.jsx');

describe('irs report', function(){
  var changeHandlerTrue = function(e){
    expect(e.target.checked).toBeTruthy();
  };

  var changeHandlerFalse = function(e){
    expect(e.target.checked).toBeFalsy();
  };

  var signature = TestUtils.renderIntoDocument(<Signature clicked={changeHandlerTrue}/>)
  var signatureNode = ReactDOM.findDOMNode(signature);

  it('renders the signature component', function(){
    expect(signatureNode).toBeDefined();
  });
});
