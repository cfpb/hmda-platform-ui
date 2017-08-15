import { REQUEST_IRS,RECEIVE_IRS, REFRESH_STATE } from '../constants'

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

    case REFRESH_STATE:
      return defaultIRS

    default:
      return state
  }
}
