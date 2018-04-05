import {
  REQUEST_INSTITUTIONS,
  RECEIVE_INSTITUTIONS,
  REQUEST_INSTITUTION,
  RECEIVE_INSTITUTION
} from '../constants'

const defaultInstitutions = {
  institutions: {},
  isFetching: false,
  fetched: false
}

/*
 * Set isFetching to true when institutions are being requested
 * Set isFetching to false and populate the institutions key
 *   when data is received
 */
export default (state = defaultInstitutions, action) => {
  switch (action.type) {
    case REQUEST_INSTITUTIONS:
      return {
        ...state,
        isFetching: true
      }
    case REQUEST_INSTITUTION:
      return {
        ...state,
        institutions: {
          ...state.institutions,
          [action.id]: {
            isFetching: true
          }
        }
      }

    case RECEIVE_INSTITUTION:
      return {
        ...state,
        institutions: {
          ...state.institutions,
          [action.institution.id]: {
            isFetching: false,
            name: action.institution.name,
            id: action.institution.id,
            filings: action.filings
          }
        }
      }
    case RECEIVE_INSTITUTIONS:
      return {
        ...state,
        isFetching: false,
        fetched: true
      }

    default:
      return state
  }
}
