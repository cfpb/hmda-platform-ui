import { REQUEST_PARSE_ERRORS,RECEIVE_PARSE_ERRORS } from '../constants'

const defaultParseErrors = {
  isFetching: false,
  transmittalSheetErrors: [],
  larErrors: []
}

export default (state = defaultParseErrors, action) => {
  switch(action.type) {
    case REQUEST_PARSE_ERRORS:
      return {
        ...state,
        isFetching: true
      }

    case RECEIVE_PARSE_ERRORS:
      return {
        isFetching: false,
        transmittalSheetErrors: action.transmittalSheetErrors,
        larErrors: action.larErrors
      }

    default:
      return state
  }
}
