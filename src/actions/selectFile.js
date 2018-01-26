import setFile from './setFile.js'
import * as Poller from './Poller.js'

export default function selectFile(file) {
  return (dispatch, getState) => {
    Poller.set(false)
    const institution = getState().app.institutionId
    return dispatch(setFile(file, institution))
  }
}
