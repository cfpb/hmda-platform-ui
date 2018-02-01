import receiveFileErrors from './receiveFileErrors.js'
import * as types from '../constants'

export default function processFileErrors(errors, file) {
  return (dispatch, getState) => {
    const id = getState().app.institutionId
    return dispatch(receiveFileErrors(id, errors, file))
  }
}
