import * as types from '../constants'

export default function uploadStart() {
  return (dispatch, getState) => {
    return dispatch({
      type: types.UPLOAD_START,
      id: getState().app.institution.id
    })
  }
}
