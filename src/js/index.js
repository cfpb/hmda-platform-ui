var React = require('react');
var ReactDOM = require('react-dom');
var api = require('./api');
var userSelect = require('./userSelect.jsx');
var fiContainer = require('./fiContainer.jsx');


ReactDOM.render(
  React.createElement(userSelect, {callback: selectCallback}),
  document.getElementById('userSelectRoot')
);

var container = ReactDOM.render(
                  React.createElement(fiContainer, {institutions: []}),
                  document.getElementById('app')
                );

function selectCallback(e){
  var user = e.target.value;
  console.log('selecting user: ', user);
  api.getInstitutions(user, function(institutions){
   container.updateInstitutions(institutions);
  });
}

