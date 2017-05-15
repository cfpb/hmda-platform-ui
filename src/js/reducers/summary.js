export const summary = (state = defaultSummary, action) => {
  switch (action.type) {
    case REQUEST_SUMMARY:
      return {
        ...state,
        isFetching: true
      }

    case RECEIVE_SUMMARY:
      return {
        ...state,
        isFetching: false,
        respondent: action.respondent,
        file: action.file
      }

    default:
      return state
  }
}
