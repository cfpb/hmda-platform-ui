import {
  FADE_PAGINATION,
  FADE_IN_PAGINATION
} from '../constants'

const defaultPaginationFade = {}

export default (state = defaultPaginationFade, action) => {
  switch(action.type) {
    case FADE_PAGINATION:
      return {
        ...state,
        [action.target]: 1
      }
    case FADE_IN_PAGINATION:
      return {
        ...state,
        [action.target]: 0
      }
    default:
      return state
  }
}
