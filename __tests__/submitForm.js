jest.autoMockOff();

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var makeSubmitForm = require('../src/js/makeSubmitForm.jsx');
var SubmitForm = makeSubmitForm();

describe('submitform', function(){
  var form = TestUtils.renderIntoDocument(
    <SubmitForm/>
  );
  var formNode = ReactDOM.findDOMNode(form);

  it('renders the form', function(){
    expect(formNode).toBeDefined();
  });

  TestUtils.Simulate.change(
    TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')[0],
    {target: {files: [{size: 128, name: 'fakefile'}]}}
  );

  it('sets the file and resets uploaded status', function(){
    expect(form.state.uploaded).toEqual(0);
    expect(form.state.file).toBeDefined();
    expect(form.state.file.size).toEqual(128);
    expect(form.state.file.name).toEqual('fakefile');
  });

  /*TestUtils.Simulate.submit(
    TestUtils.findRenderedDOMComponentsWithTag(form, 'form')
  );*/

});
