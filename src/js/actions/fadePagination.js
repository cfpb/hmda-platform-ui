import * as types from '../constants'

export default function fadePagination(target) {
  return {
    type: types.FADE_PAGINATION,
    target: target
  }
}
