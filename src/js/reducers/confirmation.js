/*
 * Track confirmation modal for refiling
 */
export const confirmation = (state = defaultConfirmation, action) => {
  switch (action.type) {
  case SHOW_CONFIRM:
    return {
      showing: action.showing,
      id: action.id,
      filing: action.filing,
      code: action.code
    }
  case HIDE_CONFIRM:
    return {
      ...state,
      showing: action.showing,
    }
  default:
    return state
  }
}
