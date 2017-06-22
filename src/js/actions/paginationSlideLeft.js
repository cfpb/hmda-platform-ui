import * as types from '../constants'

export default function paginationSlideLeft(target) {
  return {
    type: types.PAGINATION_SLIDE_LEFT,
    target: target
  }
}
