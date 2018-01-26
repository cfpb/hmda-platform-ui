import receiveFiling from './receiveFiling.js'
import receiveError from '../receiveError.js'
import hasHttpError from '../utils/hasHttpError.js'
import requestFiling from './requestFiling.js'
import { getFiling } from '../api/api.js'
import { error } from '../utils/log.js'

export default function fetchFiling(filing) {
  return dispatch => {
    dispatch(requestFiling())
    return getFiling(filing.institutionId, filing.period)
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }
          return dispatch(receiveFiling(json))
        })
      })
      .catch(err => error(err))
  }
}
