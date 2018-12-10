import * as types from '../constants'

export default function refreshState() {
  return (dispatch, getState) => {
    const id = getState().app.lei
    return dispatch({
      type: types.REFRESH_STATE,
      id: id
    })
  }
}
