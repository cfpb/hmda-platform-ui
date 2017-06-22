import * as types from '../constants'

export default function fadeInPagination(target) {
  return {
    type: types.FADE_IN_PAGINATION,
    target: target
  }
}
