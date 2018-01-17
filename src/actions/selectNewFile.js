import * as types from '../constants'
import * as Poller from './Poller.js'

export default function selectNewFile(file) {
  return (dispatch, getState) => {
    Poller.set(false)
    return dispatch({
      type: types.SELECT_NEW_FILE,
      file,
      id: getState().app.institution.id
    })
  }
}
