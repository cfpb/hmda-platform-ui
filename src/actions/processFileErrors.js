import receiveFileErrors from './receiveFileErrors.js'

export default function processFileErrors(errors, file) {
  return (dispatch, getState) => {
    const id = getState().app.lei
    return dispatch(receiveFileErrors(id, errors, file))
  }
}
