import receiveSubmission from './receiveSubmission.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import requestSubmission from './requestSubmission.js'
import { createSubmission } from '../api/api.js'
import { error } from '../utils/log.js'

export default function fetchNewSubmission(id, period) {
  return dispatch => {
    localStorage.removeItem(`HMDA_FILENAME/${id}`)
    localStorage.removeItem(`HMDA_FILE_PROGRESS/${id}`)

    dispatch(requestSubmission())
    return createSubmission(id, period)
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }
          return dispatch(receiveSubmission(json))
        })
      })
      .catch(err => error(err))
  }
}
