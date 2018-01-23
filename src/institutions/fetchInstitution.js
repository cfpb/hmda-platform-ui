import fetchEachFiling from '../submission/fetchEachFiling.js'
import receiveInstitution from './receiveInstitution.js'
import receiveError from '../receiveError.js'
import hasHttpError from '../utils/hasHttpError.js'
import { getInstitution } from '../api/api.js'
import requestInstitution from './requestInstitution.js'
import { error } from '../utils/log.js'

export default function fetchInstitution(institution, fetchFilings = true) {
  return dispatch => {
    dispatch(requestInstitution())
    return getInstitution(institution.id)
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }
          dispatch(receiveInstitution(json))
          if (json.filings && fetchFilings) {
            return dispatch(fetchEachFiling(json.filings))
          }
        })
      })
      .catch(err => error(err))
  }
}
