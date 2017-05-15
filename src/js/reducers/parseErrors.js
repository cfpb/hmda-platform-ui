export const parseErrors = (state = defaultParseErrors, action) => {
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
