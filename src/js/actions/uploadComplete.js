import * as types from '../constants'

export default function uploadComplete(xhrLoadEvent) {
  return (dispatch, getState) => {
    return dispatch({
      type: types.UPLOAD_COMPLETE,
      xhrLoadEvent,
      id: getState().app.institution.id
    })
  }
}
