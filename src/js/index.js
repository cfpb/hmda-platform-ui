import React from 'react'
import { render } from 'react-dom'
import 'babel-polyfill'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import createOidcMiddleware, { createUserManager, OidcProvider, reducer } from 'redux-oidc'
import oidc from 'oidc-client'

import AppContainer from './containers/App.jsx'
import oidcCallback from './containers/oidcCallback.jsx'
import HomeContainer from './containers/Home.jsx'
import InstitutionContainer from './containers/Institutions.jsx'
import SubmissionContainer from './containers/Submission.jsx'
import SubmissionRouter from './containers/SubmissionRouter.jsx'
import LoginContainer from './containers/Login.jsx'
import userManager from './UserManager.js'

import appReducer from './reducers'

oidc.Log.logger = console

const oidcMiddleware = createOidcMiddleware(userManager, () => false, false, '/oidc-callback')
const loggerMiddleware = createLogger()

const store = createStore(
  combineReducers(
    {
      app: appReducer,
      routing: routerReducer,
      oidc: reducer
    }
  ),
  applyMiddleware(thunkMiddleware, oidcMiddleware, loggerMiddleware)
)

const history = syncHistoryWithStore(browserHistory, store)

history.listen((location) => {
  console.log(JSON.parse(localStorage.getItem('hmdaHistory')))
  console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
  localStorage.setItem('hmdaHistory', JSON.stringify(location))
})

render(
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager}>
      <Router history={history}>
        <Route path="/" component={AppContainer}>
          <IndexRoute component={HomeContainer}/>
          <Route path="/oidc-callback" component={oidcCallback}/>
          <Route path="/institutions" component={InstitutionContainer}/>
          <Route path="/:institution/:filing" component={SubmissionRouter}/>
          <Route path="/:institution/:filing/*" component={SubmissionContainer}/>
        </Route>
      </Router>
    </OidcProvider>
  </Provider>,
  document.getElementById('app')
);
