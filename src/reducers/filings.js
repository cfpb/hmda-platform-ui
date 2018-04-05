import { REQUEST_FILING, RECEIVE_FILING } from '../constants'

const defaultFilings = {}

/*
 * Populate a list with data on every filing period for each institution
 * When filing data for an institution is received, it is added to the list
 */
export default (state = defaultFilings, action) => {
  switch (action.type) {
    case REQUEST_FILING:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.period]: {
            isFetching: true,
            fetched: false,
            filing: null
          }
        }
      }
    case RECEIVE_FILING:
      return {
        ...state,
        [action.filing.filing.institutionId]: {
          ...state[action.filing.filing.institutionId],
          [action.filing.filing.period]: {
            isFetching: false,
            fetched: true,
            filing: action.filing
          }
        }
      }
    default:
      return state
  }
}
