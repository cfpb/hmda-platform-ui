import * as types from '../constants'

export default function setInstitution(id) {
  return {
    type: types.SET_INSTITUTION,
    id: id
  }
}
