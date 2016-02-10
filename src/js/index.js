var React = require('react');
var ReactDOM = require('react-dom');
var FileSubmissionForm = require('./file-submission-form.jsx');

ReactDOM.render(
  React.createElement(FileSubmissionForm, null),
  document.getElementById('app')
);
