import fetchEdits from '../edits/fetchEdits.js'
import receiveSubmission from '../receiveSubmission.js'
import receiveError from '../../receiveError.js'
import hasHttpError from '../../utils/hasHttpError.js'
import { getLatestSubmission } from '../../api/api.js'
import { error } from '../../utils/log.js'
import {
  PARSED_WITH_ERRORS,
  VALIDATED_WITH_ERRORS
} from '../../constants/statusCodes.js'

export const makeDurationGetter = () => {
  let count = 0
  return () => {
    let duration = (Math.pow(1.2, count) * 1000) >> 0
    if (duration > 20000) duration = 20000
    else count++
    return duration
  }
}

export default function pollForProgress(polling) {
  const getTimeoutDuration = makeDurationGetter()

  const poller = dispatch => {
    if (!polling) return Promise.resolve()
    if (!location.pathname.match('/upload')) return Promise.resolve()
    return getLatestSubmission()
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }
          return dispatch(receiveSubmission(json))
        })
      })
      .then(json => {
        if (
          // continue polling until we reach a status that isn't processing
          json.status.code < VALIDATED_WITH_ERRORS &&
          json.status.code !== PARSED_WITH_ERRORS
        ) {
          setTimeout(() => poller(dispatch), getTimeoutDuration())
        } else if (
          // we don't need edits if it parsed with errors
          json.status.code !== PARSED_WITH_ERRORS
        ) {
          return dispatch(fetchEdits())
        }
      })
      .catch(err => error(err))
  }
  return poller
}
