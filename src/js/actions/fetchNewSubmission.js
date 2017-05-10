export default function fetchNewSubmission(id, period) {
  return dispatch => {
    dispatch(requestSubmission())
    return createSubmission(id, period)
      .then(json => {
        return new Promise((resolve, reject) => {
          if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
          dispatch(receiveSubmission(json))
          resolve()
        })
      })
      .catch(err => console.error(err))
  }
}
