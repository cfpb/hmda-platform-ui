import fetchEdits from './fetchEdits.js'
import receiveSubmission from './receiveSubmission.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import getLatestSubmission from '../api/api.js'

export default function pollForProgress(polling) {
  const poller = dispatch => {
    if(!polling) return Promise.resolve()
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
