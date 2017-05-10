export function fetchSignature() {
  return dispatch => {
    dispatch(requestSignature())
    return getSignature(latestSubmissionId)
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        dispatch(receiveSignature(json))
        return dispatch(updateStatus(
          {
            code: json.status.code,
            message: json.status.message
          }
        ))
      })
      .catch(err => console.error(err))
  }
}
