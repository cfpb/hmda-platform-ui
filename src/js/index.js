var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var AppContainer = require('./AppContainer.jsx');
var FiContainer = require('./FiContainer.jsx');
var makeSubmitForm = require('./makeSubmitForm.jsx');

var Router = router.Router;
var browserHistory = router.browserHistory;
var Route = router.Route;
var IndexRoute = router.IndexRoute;


var Submit = makeSubmitForm('/submit', function(){
  console.log('submited, -> transition');
});

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={FiContainer}/>
      <Route path="/upload" component={Submit}/>
    </Route>
  </Router>
), document.getElementById('app')
);


