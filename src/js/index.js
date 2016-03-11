var React = require('react');
var ReactDOM = require('react-dom');
var api = require('./api');
var fiContainer = require('./fiContainer.jsx');
//var makeSubmitForm = require('./makeSubmitForm.jsx');

/*
var SubmitForm = makeSubmitForm('/submit', function(e){
  console.log(e, 'file uploaded');
});
*/

api.getInstitutions(function(institutions){
  console.log(institutions);
  ReactDOM.render(
    React.createElement(fiContainer, null, {institutions: institutions}),
    document.getElementById('app')
  );
});

