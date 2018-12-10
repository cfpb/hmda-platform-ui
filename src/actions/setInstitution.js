import * as types from '../constants'

export default function setInstitution(lei) {
  return {
    type: types.SET_INSTITUTION,
    lei
  }
}
