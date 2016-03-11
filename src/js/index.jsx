var React = require('react');
var ReactDOM = require('react-dom');
var api = require('./api');
var fiContainer = require('./fiContainer');
//var makeSubmitForm = require('./makeSubmitForm.jsx');

/*
var SubmitForm = makeSubmitForm('/submit', function(e){
  console.log(e, 'file uploaded');
});
*/

api.getInstitutions(function(institutions){
  ReactDOM.render(
    <fiContainer institutions={institutions}/>,
    document.getElementById('app')
  );
});

