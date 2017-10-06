import receiveFiling from './receiveFiling.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import requestFiling from './requestFiling.js'
import { getFiling } from '../api/api.js'

export default function fetchFiling(filing) {
  return dispatch => {
    dispatch(requestFiling())
    return getFiling(filing.institutionId, filing.period)
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(`${json.status}: ${json.statusText}`)
          }
          return dispatch(receiveFiling(json))
        })
      })
      .catch(err => console.error(err))
  }
}
