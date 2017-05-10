export default function pollForProgress(pollObj = {}) {
  const poller = dispatch => {
    if(!pollObj.polling) return Promise.resolve()
    if(!location.pathname.match('/upload')) return Promise.resolve()
    return getLatestSubmission()
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        return dispatch(receiveSubmission(json))
      })
      .then(json => {
        if(json.status.code < 8 && json.status.code !== 5){
          setTimeout(() => poller(dispatch), 1000)
        } else {
          return dispatch(fetchEdits())
        }
      })
      .catch(err => console.error(err))
  }
  return poller
}
