import receiveSubmission from './receiveSubmission.js'
import fetchNewSubmission from './fetchNewSubmission.js'
import hasHttpError from './hasHttpError.js'
import receiveError from './receiveError.js'
import requestSubmission from './requestSubmission.js'
import { getLatestSubmission } from '../api/api.js'
import parseLocation from '../api/parseLocation.js'
import { error } from '../utils/log.js'

export default function fetchSubmission() {
  return dispatch => {
    dispatch(requestSubmission())
    return getLatestSubmission()
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (!hasError) return dispatch(receiveSubmission(json))

          if (json.status === 404) {
            const { id, filing } = parseLocation(location)
            return dispatch(fetchNewSubmission(id, filing))
          }

          dispatch(receiveError(json))
          throw new Error(`${json.status}: ${json.statusText}`)
        })
      })
      .catch(err => error(err))
  }
}
