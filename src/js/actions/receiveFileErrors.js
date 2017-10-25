import * as types from '../constants'

export default function receiveFileErrors(errors, id) {
  return {
    type: types.RECEIVE_FILE_ERRORS,
    errors,
    id
  }
}
