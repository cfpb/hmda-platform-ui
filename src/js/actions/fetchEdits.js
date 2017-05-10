export function fetchEdits() {
  return dispatch => {
    dispatch(requestEdits())
    return getEdits({submission: latestSubmissionId})
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        dispatch(receiveEdits(json))
        dispatch(fetchEachEdit(json))
        return json
      })
      .catch(err => console.error(err))
  }
}
