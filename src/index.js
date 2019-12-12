import 'react-app-polyfill/ie11' // For IE 11 support

import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import {
  Router,
  Redirect,
  Route,
  browserHistory,
  IndexRoute,
  applyRouterMiddleware
} from 'react-router'
import useScroll from 'react-router-scroll/lib/useScroll'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import Keycloak from 'keycloak-js'
import AppContainer from './App.jsx'
import HomeContainer from './home/container.jsx'
import InstitutionContainer from './institutions/container.jsx'
import SubmissionRouter from './submission/router.jsx'
import { setKeycloak } from './utils/keycloak.js'
import { setStore } from './utils/store.js'
import log from './utils/log.js'
import appReducer from './reducers'
import { fetchEnvConfig, getEnvConfig } from './utils/configUtils'
import { setConfig } from './actions/setConfig'

const middleware = [thunkMiddleware]

setKeycloak(Keycloak(process.env.PUBLIC_URL + '/keycloak.json'))

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

const history = syncHistoryWithStore(browserHistory, store)

history.listen(location => {
  log(JSON.parse(localStorage.getItem('hmdaHistory')))
  log(
    `The current URL is ${location.pathname}${location.search}${location.hash}`
  )
  localStorage.setItem('hmdaHistory', JSON.stringify(location))
})

fetchEnvConfig()
  .then(config => {
    const envConfig = getEnvConfig(config, window.location.host)
    store.dispatch(setConfig(envConfig))
    renderWithPeriod(envConfig.defaultPeriod)
  })
  .catch(() => {
    store.dispatch(setConfig({ filingPeriods: ['2018'] }))
    renderWithPeriod()
  })

function renderWithPeriod(defaultPeriod = 2018){
  render(
    <Provider store={store}>
      <Router history={history} render={applyRouterMiddleware(useScroll())}>
        <Redirect from="/" to={`/filing/${defaultPeriod}/`} />
        <Redirect from="/filing" to={`/filing/${defaultPeriod}/`} />
        <Route path={'/filing/:filingPeriod/'} component={AppContainer}>
          <IndexRoute component={HomeContainer} />
          <Route
            path={'/filing/:filingPeriod/institutions'}
            component={InstitutionContainer}
          />
          <Route
            path={'/filing/:filingPeriod/:lei/'}
            component={SubmissionRouter}
          />
          <Route
            path={'/filing/:filingPeriod/:lei/*'}
            component={SubmissionRouter}
          />
          <Route path={'/filing/:filingPeriod/*'} component={SubmissionRouter} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('root')
  )
}
