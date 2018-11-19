import fetchEdits from './fetchEdits.js'
import receiveSubmission from './receiveSubmission.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import { getLatestSubmission } from '../api/api.js'
import { error } from '../utils/log.js'
import {
  PARSED_WITH_ERRORS,
  VALIDATING,
  VALIDATED
} from '../constants/statusCodes.js'

export const makeDurationGetter = () => {
  let count = 0
  return () => {
    let duration = (Math.pow(1.2, count) * 1000) >> 0
    if (duration > 20000) duration = 20000
    else count++
    return duration
  }
}

let poll = 0

export default function pollForProgress() {
  const getTimeoutDuration = makeDurationGetter()
  let errorCounter = 0
  const currentPoll = ++poll

  const poller = dispatch => {
    if (currentPoll !== poll || !window.location.pathname.match('/upload'))
      return Promise.resolve(null)
    return getLatestSubmission()
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            if (++errorCounter >= 3) {
              dispatch(receiveError(json))
              throw new Error(json && `${json.status}: ${json.statusText}`)
            } else {
              setTimeout(poller.bind(null, dispatch), getTimeoutDuration())
              return Promise.resolve()
            }
          }
          errorCounter = 0
          return dispatch(receiveSubmission(json))
        })
      })
      .then(json => {
        if (!json) return
        if (
          // continue polling until we reach a status that isn't processing
          json.status.code <= VALIDATING &&
          json.status.code !== PARSED_WITH_ERRORS
        ) {
          setTimeout(poller.bind(null, dispatch), getTimeoutDuration())
        } else if (
          // we don't need edits if it parsed with errors
          json.status.code > VALIDATING &&
          json.status.code < VALIDATED
        ) {
          return dispatch(fetchEdits())
        }
      })
      .catch(err => {
        error(err)
      })
  }
  return poller
}
