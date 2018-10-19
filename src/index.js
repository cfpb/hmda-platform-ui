import 'react-app-polyfill/ie11' // For IE 11 support

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
import AppContainer from './App.jsx'
import HomeContainer from './home/container.jsx'
import InstitutionContainer from './institutions/container.jsx'
import SubmissionRouter from './submission/router.jsx'
import { setStore } from './api/fetch.js'
import log from './utils/log.js'
import appReducer from './reducers'

const middleware = [thunkMiddleware]

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

const history = syncHistoryWithStore(browserHistory, store)

history.listen(location => {
  log(JSON.parse(localStorage.getItem('hmdaHistory')))
  log(
    `The current URL is ${location.pathname}${location.search}${location.hash}`
  )
  localStorage.setItem('hmdaHistory', JSON.stringify(location))

  if (window.ga && ga.create) {
    ga('create', 'UA-56928643-1', 'auto')
    ga('set', 'page', location.pathname)
    ga('send', 'pageview')
  }
})

render(
  <Provider store={store}>
    <Router history={history} render={applyRouterMiddleware(useScroll())}>
      <Route path={'/'} component={AppContainer}>
        <IndexRoute component={HomeContainer} />
        <Route path={'/institutions'} component={InstitutionContainer} />
        <Route path={'/:institution/:filing'} component={SubmissionRouter} />
        <Route path={'/:institution/:filing/*'} component={SubmissionRouter} />
        <Route path={'*'} component={SubmissionRouter} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
