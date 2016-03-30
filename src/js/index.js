var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var AppContainer = require('./AppContainer.jsx');
var InstitutionContainer = require('./InstitutionContainer.jsx');
var makeUploadForm = require('./makeUploadForm.jsx');

var Router = router.Router;
var browserHistory = router.browserHistory;
var Route = router.Route;
var IndexRoute = router.IndexRoute;

var Upload = makeUploadForm('/submit', function(){
  console.log('submited, -> transition');
});

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={InstitutionContainer}/>
      <Route path="/upload/:encodedInstitutionName" component={Upload}/>
    </Route>
  </Router>
), document.getElementById('app')
);
