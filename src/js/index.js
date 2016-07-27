import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import AppContainer from 'AppContainer.jsx'
import InstitutionContainer from 'InstitutionContainer.jsx'
import SubmissionContainer from 'SubmissionContainer.jsx'

import appReducer from './reducers'

const store = createStore(
  combineReducers(
    {
      appReducer,
      routing: routerReducer
    },
    applyMiddleware(thunkMiddleware)
  )
)

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={InstitutionContainer}/>
        <Route path="/:institution/:period/:submission" component={SubmissionContainer}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
