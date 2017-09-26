import * as types from '../constants'

export default function setInstitution(institution) {
  return {
    type: types.SET_INSTITUTION,
    institution: institution
  }
}
