/* global ga */
import '@babel/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
  applyRouterMiddleware
} from 'react-router'
import useScroll from 'react-router-scroll/lib/useScroll'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import oidc from 'oidc-client'
import AppContainer from './App.jsx'
import oidcCallback from './oidc/oidcCallback.jsx'
import HomeContainer from './home/container.jsx'
import InstitutionContainer from './institutions/container.jsx'
import SubmissionRouter from './submission/router.jsx'
import createUserManager from './utils/createUserManager.js'
import { setUserManager, setDispatch } from './utils/redirect.js'
import { setStore } from './api/fetch.js'
import log from './utils/log.js'
import appReducer from './reducers'

window.HMDA_ENV = {
  HOMEPAGE_URL: '##HOMEPAGE_URL##',
  FILING_APP_URL: '##FILING_APP_URL##',
  HMDA_API: '##HMDA_API##',
  KEYCLOAK_URL: '##KEYCLOAK_URL##'
}

const suffix = (window.HMDA_ENV.APP_SUFFIX =
  '/' +
  window.HMDA_ENV.FILING_APP_URL
    .split('/')
    .slice(3)
    .join('/'))

const middleware = [thunkMiddleware]

// awesome dev stuff
// use `yarn run js:dev` to see it in action
if (process.env.NODE_ENV !== 'production') {
  // redux logging
  const loggerMiddleware = createLogger({ collapsed: true })
  middleware.push(loggerMiddleware)

  // user logging
  oidc.Log.logger = console

  // react update logging
  const { whyDidYouUpdate } = require('why-did-you-update')
  whyDidYouUpdate(React)
}

let store
if (process.env.NODE_ENV !== 'production') {
  // use redux dev tools, extension required
  // see https://github.com/zalmoxisus/redux-devtools-extension#installation
  const { composeWithDevTools } = require('redux-devtools-extension')
  store = createStore(
    combineReducers({
      app: appReducer,
      routing: routerReducer
    }),
    composeWithDevTools(applyMiddleware(...middleware))
  )
} else {
  store = createStore(
    combineReducers({
      app: appReducer,
      routing: routerReducer
    }),
    applyMiddleware(...middleware)
  )
}

setStore(store)
setDispatch(store.dispatch)

const userManager = createUserManager(store.dispatch)
setUserManager(userManager)

/*Prevent token expiration loop*/
userManager.events.addSilentRenewError(e => {
  userManager.events._cancelTimers()
})

const history = syncHistoryWithStore(browserHistory, store)

history.listen(location => {
  log(JSON.parse(localStorage.getItem('hmdaHistory')))
  log(
    `The current URL is ${location.pathname}${location.search}${location.hash}`
  )
  localStorage.setItem('hmdaHistory', JSON.stringify(location))

  if (window.ga && ga.create) {
    ga('create', 'UA-56928643-1', 'auto')

    if (location.pathname !== '/oidc-callback') {
      ga('set', 'page', location.pathname)
      ga('send', 'pageview')
    }
  }
})

render(
  <Provider store={store}>
    <Router history={history} render={applyRouterMiddleware(useScroll())}>
      <Route path={suffix} component={AppContainer}>
        <IndexRoute component={HomeContainer} />
        <Route path={suffix + 'oidc-callback'} component={oidcCallback} />
        <Route
          path={suffix + 'institutions'}
          component={InstitutionContainer}
        />
        <Route
          path={suffix + ':institution/:filing'}
          component={SubmissionRouter}
        />
        <Route
          path={suffix + ':institution/:filing/*'}
          component={SubmissionRouter}
        />
        <Route path={suffix + '*'} component={SubmissionRouter} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
