jest.dontMock('../src/js/Signature.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var Signature = require('../src/js/Signature.jsx');

describe('irs report', function(){

  var signature = TestUtils.renderIntoDocument(<Signature/>)
  var signatureNode = ReactDOM.findDOMNode(signature);

  it('renders the irs report component', function(){
    expect(signatureNode).toBeDefined();
  });
});
