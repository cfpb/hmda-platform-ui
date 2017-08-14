import setFile from './setFile.js'
import * as types from '../constants'
import * as Poller from './Poller.js'

export default function selectFile(file) {
  return (dispatch, getState) => {
    Poller.set(false)
    const institution = getState().app.institution.id
    localStorage.setItem(`HMDA_FILENAME/${institution}`, file.name)
    return dispatch(setFile(file))
  }
}
