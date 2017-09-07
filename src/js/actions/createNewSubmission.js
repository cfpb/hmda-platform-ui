import refreshState from './refreshState.js'
import fetchNewSubmission from './fetchNewSubmission.js'

export default function createNewSubmission(id, period) {
  return dispatch => {
    dispatch(refreshState())
    localStorage.removeItem(`HMDA_FILENAME/${id}`)
    localStorage.removeItem(`HMDA_FILE_PROGRESS/${id}`)
    return dispatch(fetchNewSubmission(id, period))
  }
}
