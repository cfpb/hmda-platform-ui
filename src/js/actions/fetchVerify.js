export default function fetchVerify(type, checked) {
  return dispatch => {
    return postVerify(latestSubmissionId, type, checked)
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))

        if(type === 'quality') dispatch(verifyQuality(checked))
        else dispatch(verifyMacro(checked))

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
