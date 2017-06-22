import * as types from '../constants'

export default function paginationSlideRight(target) {
  return {
    type: types.PAGINATION_SLIDE_RIGHT,
    target: target
  }
}

