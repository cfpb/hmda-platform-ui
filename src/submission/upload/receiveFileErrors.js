import * as types from '../../constants'

export default function receiveFileErrors(id, errors, file) {
  return {
    type: types.RECEIVE_FILE_ERRORS,
    id,
    errors,
    file
  }
}
