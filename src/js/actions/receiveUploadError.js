import * as types from '../constants'

export default function receiveUploadError(error) {
  console.log('ERROR bby', error)
  return (dispatch, getState) => {
    return dispatch({
      type: types.RECEIVE_UPLOAD_ERROR,
      error,
      id: getState().app.institution.id
    })
  }
}
