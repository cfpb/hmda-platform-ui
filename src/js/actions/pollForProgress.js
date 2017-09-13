import fetchEdits from './fetchEdits.js'
import receiveSubmission from './receiveSubmission.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import { getLatestSubmission } from '../api/api.js'
import { PARSED_WITH_ERRORS, VALIDATED_WITH_ERRORS } from '../constants/statusCodes.js'

export const makeDurationGetter = () => {
  let count = 0
  return () => {
    let duration = Math.pow(1.2, count)*1000>>0
    if (duration > 30000) duration = 30000
    else count++
    return duration
  }
}

export default function pollForProgress(polling) {
  const getTimeoutDuration = makeDurationGetter()

  const poller = dispatch => {
    if(!polling) return Promise.resolve()
    if(!location.pathname.match('/upload')) return Promise.resolve()
    return getLatestSubmission()
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if(hasError){
            dispatch(receiveError(json))
            throw new Error(`${json.status}: ${json.statusText}`)
          }
          return dispatch(receiveSubmission(json))
        })
      })
      .then(json => {
        if(json.status.code < VALIDATED_WITH_ERRORS &&
           json.status.code !== PARSED_WITH_ERRORS){
             setTimeout(() => poller(dispatch), getTimeoutDuration())
        } else {
          return dispatch(fetchEdits())
        }
      })
      .catch(err => console.error(err))
  }
  return poller
}
