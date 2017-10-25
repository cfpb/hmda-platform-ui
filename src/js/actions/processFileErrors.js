import receiveFileErrors from './receiveFileErrors.js'
import * as types from '../constants'

export default function processFileErrors(errors) {
  return (dispatch, getState) => {
    const id = getState().app.institution.id
    return dispatch(receiveFileErrors(errors, id))
  }
}
