import * as types from '../constants'

export default function refreshState() {
  return (dispatch, getState) => {
    const id = getState().app.institution.id
    localStorage.removeItem(`HMDA_FILENAME/${id}`)

    return dispatch({
      type: types.REFRESH_STATE,
      id: id
    })
  }
}
