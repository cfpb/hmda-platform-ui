var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var api = require('./api');
var UserSelect = require('./UserSelect.jsx');
var AppContainer = require('./AppContainer.jsx');
var FiContainer = require('./FiContainer.jsx');
var makeSubmitForm = require('./makeSubmitForm.jsx');

var Router = router.Router;
var browserHistory = router.browserHistory;
var Route = router.Route;
var IndexRoute = router.IndexRoute;

ReactDOM.render(
  <UserSelect callback={selectCallback} />,
  document.getElementById('userSelectRoot')
);

var submit = makeSubmitForm('/submit', function(){
  console.log('submited, -> transition');
});

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={FiContainer}/>
      <Route path="/submit" component={submit}/>
    </Route>
  </Router>
), document.getElementById('app')
);

function selectCallback(e){
  var user = e.target.value;
  console.log('selecting user: ', user);
  api.getInstitutions(user, function(institutions){
    console.log("SELECT");
    //appContainer.setUser({name: user, institutions: institutions});
  });
}
