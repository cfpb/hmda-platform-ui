import receiveSummary from './receiveSummary.js'
import receiveError from '../../receiveError.js'
import hasHttpError from '../../utils/hasHttpError.js'
import { getId } from '../submission.js'
import requestSummary from './requestSummary.js'
import { getSummary } from '../../api/api.js'
import { error } from '../../utils/log.js'

export default function fetchSummary() {
  return dispatch => {
    dispatch(requestSummary())
    return getSummary(getId())
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }
          return dispatch(receiveSummary(json))
        })
      })
      .catch(err => error(err))
  }
}
