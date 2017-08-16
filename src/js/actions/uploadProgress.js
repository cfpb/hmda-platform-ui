import * as types from '../constants'

export default function uploadProgress(percent) {
  return (dispatch, getState) => {
    return dispatch({
      type: types.UPLOAD_PROGRESS,
      percentUploaded: percent,
      id: getState().app.institution.id
    })
  }
}
