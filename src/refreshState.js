import * as types from './constants'

export default function refreshState() {
  return (dispatch, getState) => {
    const id = getState().app.institution.id
    return dispatch({
      type: types.REFRESH_STATE,
      id: id
    })
  }
}
