jest.dontMock('../src/js/file-submission-form.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var FileSubmissionForm = require('../src/js/file-submission-form.jsx');

describe('file-submission-form', function() {
  it('renders the form', function() {
    var form = TestUtils.renderIntoDocument(
      <FileSubmissionForm />
    );
    var formNode = ReactDOM.findDOMNode(form);

    expect(formNode).toBeDefined();
  });
});
