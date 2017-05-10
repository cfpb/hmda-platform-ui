export function fetchProgress(id) {
  return dispatch => {
    return getSubmission(id)
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        return dispatch(receiveSubmission(json))
      })
      .catch(err => console.error(err))
  }
}
