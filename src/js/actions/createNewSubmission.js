export default function createNewSubmission(id, period, page = null) {
  return dispatch => {
    dispatch(refreshState())
    return dispatch(fetchNewSubmission(id, period))
  }
}
