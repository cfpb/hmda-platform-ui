var React = require('react');
var ReactDOM = require('react-dom');
var api = require('./api');
var userSelect = require('./userSelect.jsx');
var fiContainer = require('./fiContainer.jsx');
//var makeSubmitForm = require('./makeSubmitForm.jsx');

/*
var SubmitForm = makeSubmitForm('/submit', function(e){
  console.log(e, 'file uploaded');
});
*/

ReactDOM.render(
  React.createElement(userSelect, {callback: selectCallback}),
  document.getElementById('userSelectRoot')
);

function selectCallback(e){
  var user = e.target.value;
  console.log(user);
  api.getInstitutions(user, function(institutions){
    console.log(institutions);
    ReactDOM.render(
      React.createElement(fiContainer, {institutions: institutions}),
      document.getElementById('app')
    );
  });
}

