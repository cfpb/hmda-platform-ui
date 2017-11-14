import * as types from '../constants'

export default function receiveUpload(data) {
  return (dispatch, getState) => {
    return dispatch({
      type: types.UPLOAD_COMPLETE,
      data,
      id: getState().app.institution.id
    })
  }
}
