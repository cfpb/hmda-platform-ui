var React = require('react');
var ReactDOM = require('react-dom');
var api = require('./api');
var UserSelect = require('./UserSelect.jsx');
var UserFiHeading = require('./UserFiHeading.jsx');
var FiContainer = require('./FiContainer.jsx');


ReactDOM.render(
  <UserSelect callback={selectCallback} />,
  document.getElementById('userSelectRoot')
);

var container = ReactDOM.render(
  <FiContainer institutions={[]} />,
  document.getElementById('app')
);

function selectCallback(e){
  var user = e.target.value;
  console.log('selecting user: ', user);
  api.getInstitutions(user, function(institutions){
    container.updateInstitutions(institutions);
  });

  ReactDOM.render(
    <UserFiHeading institution={{}} year='2017' user={user} />,
    document.getElementById('userFiHeading')
  );
}
