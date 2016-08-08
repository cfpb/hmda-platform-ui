import { combineReducers } from 'redux'
import { REQUEST_INSTITUTIONS, RECEIVE_INSTITUTIONS,
  RECEIVE_INSTITUTION, CLEAR_FILINGS } from '../actions'

const institutions = (state = {}, action) => {
  switch (action.type) {
  case REQUEST_INSTITUTIONS:
    return {
      ...state,
      isFetching: true
    }
  case RECEIVE_INSTITUTIONS:
    return {
      isFetching: false,
      institutions: action.institutions
    }
  default:
    return state;
  }
}

const filings = (state = [], action) => {
  switch (action.type) {
  case RECEIVE_INSTITUTION:
    return [
      ...state,
      ...action.institution.filings
    ]
  case CLEAR_FILINGS:
    return []
  default:
    return state;
  }
}

export default combineReducers({
  institutions,
  filings
})
