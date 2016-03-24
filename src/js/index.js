var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var api = require('./api');
var UserSelect = require('./UserSelect.jsx');
var UserFiHeading = require('./UserFiHeading.jsx');
var FiContainer = require('./FiContainer.jsx');
var makeSubmitForm = require('./makeSubmitForm.jsx');

var Router = router.Router;
var browserHistory = router.browserHistory;
var Route = router.Route;
var IndexRoute = router.IndexRouter;

ReactDOM.render(
  <UserSelect callback={selectCallback} />,
  document.getElementById('userSelectRoot')
);

var fiContainer = <FiContainer/>
var submit = makeSubmitForm('/submit', function(){
  console.log('submited, -> transition');
});

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={fiContainer}/>
      <Route path="/submit" component={submit}/>
    </Route>
  </Router>
), document.getElementById('app')
);

function selectCallback(e){
  var user = e.target.value;
  console.log('selecting user: ', user);
  api.getInstitutions(user, function(institutions){
    fiContainer.updateInstitutions(institutions);
  });

  ReactDOM.render(
    <UserFiHeading institution={{}} year='2017' user={user} />,
    document.getElementById('userFiHeading')
  );
}
