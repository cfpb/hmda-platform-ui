import React from 'react'
import { render } from 'react-dom'
import 'babel-polyfill'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import createOidcMiddleware, { createUserManager, OidcProvider, reducer } from 'redux-oidc'
import oidc from 'oidc-client'

import AppContainer from './AppContainer.jsx'
import oidcCallback from './containers/oidcCallback.jsx'
import InstitutionContainer from './containers/Institutions.jsx'
import SubmissionContainer from './containers/Submission.jsx'
import LoginContainer from './containers/Login.jsx'
import userManager from './UserManager.js'

import appReducer from './reducers'

oidc.Log.logger = console

const oidcMiddleware = createOidcMiddleware(userManager, () => false, false, '/oidc-callback')

const store = createStore(
  combineReducers(
    {
      app: appReducer,
      routing: routerReducer,
      oidc: reducer
    }
  ),
  applyMiddleware(oidcMiddleware),
  applyMiddleware(thunkMiddleware)
)

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager}>
      <Router history={history}>
        <Route path="/" component={AppContainer}>
          <IndexRoute component={LoginContainer}/>
          <Route path="/oidc-callback" component={oidcCallback}/>
          <Route path="/institutions" component={InstitutionContainer}/>
          <Route path="/:institution/:filing" component={SubmissionContainer}/>
        </Route>
      </Router>
    </OidcProvider>
  </Provider>,
  document.getElementById('app')
);
