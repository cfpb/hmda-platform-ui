var React = require('react');
var ReactDOM = require('react-dom');
var makeSubmitForm = require('./makeSubmitForm.jsx');

var SubmitForm = makeSubmitForm('/submit', function(e){
  console.log(e, 'file uploaded');
});

ReactDOM.render(
  React.createElement(SubmitForm, null),
  document.getElementById('app')
);
