var React = require('react');
var ReactDOM = require('react-dom');
var makeSubmitContainer = require('./makeSubmitContainer.jsx');

var SubmitContainer = makeSubmitContainer('/submit', function(e){
  console.log(e, 'file uploaded');
});

ReactDOM.render(
  React.createElement(SubmitContainer, null),
  document.getElementById('app')
);
