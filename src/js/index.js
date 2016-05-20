var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var AppContainer = require('./AppContainer.jsx');
var InstitutionContainer = require('./InstitutionContainer.jsx');
var SubmissionContainer = require('./SubmissionContainer.jsx');

var Router = router.Router;
var browserHistory = router.browserHistory;
var Route = router.Route;
var IndexRoute = router.IndexRoute;

ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/:year" component={AppContainer}>
        <IndexRoute component={InstitutionContainer}/>
        <Route path="/:year/:institution/:submission" component={SubmissionContainer}/>
      </Route>
    </Router>
  ), document.getElementById('app')
);
