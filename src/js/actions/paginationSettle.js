import * as types from '../constants'

export default function paginationSettle(target) {
  return {
    type: types.PAGINATION_SETTLE,
    target: target
  }
}
