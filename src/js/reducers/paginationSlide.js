import {
  PAGINATION_SLIDE_LEFT,
  PAGINATION_SLIDE_RIGHT,
  PAGINATION_SETTLE
} from '../constants'

const defaultSlide = {}

export default (state = defaultSlide, action) => {
  switch(action.type) {
    case PAGINATION_SLIDE_LEFT:
      return {
        ...state,
        [action.target]: 'left'
      }
    case PAGINATION_SLIDE_RIGHT:
      return {
        ...state,
        [action.target]: 'right'
      }
    case PAGINATION_SETTLE:
      return {
        ...state,
        [action.target]: 'center'
      }
    default:
      return state
  }
}
