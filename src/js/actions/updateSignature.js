export function updateSignature(signed) {
  return dispatch => {
    dispatch(requestSignaturePost())
    return postSignature(latestSubmissionId, signed)
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        dispatch(receiveSignaturePost(json))
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
