import setFile from './setFile.js'
import * as types from '../../constants'
import * as Poller from './poller.js'

export default function selectFile(file) {
  return (dispatch, getState) => {
    Poller.set(false)
    const institution = getState().app.institution.id
    return dispatch(setFile(file, institution))
  }
}
