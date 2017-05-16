import * as types from '../constants'

const defaultConfirmation = {
  showing: false,
  code: 0,
  id: null,
  filing: null
}

/*
 * Track confirmation modal for refiling
 */
export default (state = defaultConfirmation, action) => {
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
