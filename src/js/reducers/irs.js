import * as types from '../constants'

const defaultIRS = {
  isFetching: false,
  msas: [],
  summary: {}
}

export default (state = defaultIRS, action) => {
  switch (action.type) {

    case REQUEST_IRS:
      return {
        ...state,
        isFetching: true
      }

    case RECEIVE_IRS:
      return {
        ...state,
        isFetching: false,
        msas: action.msas,
        summary: action.summary
      }

    default:
      return state
  }
}
