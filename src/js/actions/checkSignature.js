import * as types from '../constants'

export function checkSignature(checked) {
  return {
    type: types.CHECK_SIGNATURE,
    checked: checked
  }
}
