import { REQUEST_INSTITUTIONS, RECEIVE_INSTITUTIONS } from '../constants'
import sortInstitutions from '../utils/sortInstitutions.js'
/*
 * Set isFetching to true when institutions are being requested
 * Set isFetching to false and populate the institutions key
 *   when data is received
 */
export default (state = {}, action) => {
  switch (action.type) {
    case REQUEST_INSTITUTIONS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_INSTITUTIONS:
      return {
        isFetching: false,
        institutions: action.institutions.sort(sortInstitutions)
      }
    default:
      return state
  }
}
