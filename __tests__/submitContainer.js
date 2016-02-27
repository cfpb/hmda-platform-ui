var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

jest.autoMockOff();

var makeSubmitContainer = require('../src/js/makeSubmitContainer.jsx');
var SubmitContainer = makeSubmitContainer();

describe('submitcontainer', function() {
  it('renders the form', function() {
    var form = TestUtils.renderIntoDocument(
      <SubmitContainer />
    );
    var formNode = ReactDOM.findDOMNode(form);

    expect(formNode).toBeDefined();
  });
});
