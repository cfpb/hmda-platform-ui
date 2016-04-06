var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var AppContainer = require('./AppContainer.jsx');
var InstitutionContainer = require('./InstitutionContainer.jsx');
var UploadForm = require('./UploadForm.jsx');
var EditsContainer = require('./EditsContainer.jsx')

var Router = router.Router;
var browserHistory = router.browserHistory;
var Route = router.Route;
var IndexRoute = router.IndexRoute;

function uploadCb(){
  console.log('submited, -> transition');
}

var WrappedUpload = React.createClass({
  render: function(){
    return <UploadForm url="/submit" callback={uploadCb}/>
  }
});

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={InstitutionContainer}/>
      <Route path="/upload/:encodedInstitutionName" component={WrappedUpload}/>
      <Route path="/edits/:encodedInstitutionName" component={EditsContainer}/>
    </Route>
  </Router>
), document.getElementById('app')
);
