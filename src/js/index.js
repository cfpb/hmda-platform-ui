var React = require('react');
var ReactDOM = require('react-dom');
var api = require('./api');
var UserSelect = require('./UserSelect.jsx');
var FiContainer = require('./FiContainer.jsx');


ReactDOM.render(
  React.createElement(UserSelect, {callback: selectCallback}),
  document.getElementById('userSelectRoot')
);

var container = ReactDOM.render(
                  React.createElement(FiContainer, {institutions: []}),
                  document.getElementById('app')
                );

function selectCallback(e){
  var user = e.target.value;
  console.log('selecting user: ', user);
  api.getInstitutions(user, function(institutions){
   container.updateInstitutions(institutions);
  });
}

