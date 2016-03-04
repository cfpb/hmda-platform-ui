jest.autoMockOff();

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var makeSubmitContainer = require('../src/js/makeSubmitContainer.jsx');
var SubmitContainer = makeSubmitContainer();

describe('submitcontainer', function(){
  var container = TestUtils.renderIntoDocument(
    <SubmitContainer />
  );
  var formNode = ReactDOM.findDOMNode(container);

  it('renders the form', function(){
    expect(formNode).toBeDefined();
  });

  TestUtils.Simulate.change(
    TestUtils.scryRenderedDOMComponentsWithTag(container, 'input')[0],
    {target: {files: [{size: 128, name: 'fakefile'}]}}
  );

  it('sets the file and resets uploaded status', function(){
    var form = TestUtils.findRenderedDOMComponentWithTag(container, 'form');
    console.log(form);
    expect(form.state.uploaded).toEqual(0);
    expect(form.state.file).toBeDefined();
    expect(form.state.file.size).toEqual(128);
    expect(form.state.file.name).toEqual('fakefile');
  });

  /*TestUtils.Simulate.submit(
    TestUtils.findRenderedDOMComponentsWithTag(form, 'form')
  );*/

});
