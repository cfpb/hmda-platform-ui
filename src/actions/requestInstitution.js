import * as types from '../constants'

export default function requestInstitution(id) {
  return {
    type: types.REQUEST_INSTITUTION,
    id
  }
}
