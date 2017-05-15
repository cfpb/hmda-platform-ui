export const pagination = (state = defaultPagination, action) => {
  switch(action.type) {
    case RECEIVE_PARSE_ERRORS:
      return {
        ...state,
        parseErrors: action.pagination
      }
    case RECEIVE_EDIT:
      return {
        ...state,
        [action.edit]: action.pagination
      }
    case RECEIVE_IRS:
      return {
        ...state,
        irs: action.pagination
      }

    default:
      return state
  }
}
