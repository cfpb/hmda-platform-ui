import fetchEachInstitution from './fetchEachInstitution.js'
import receiveInstitutions from './receiveInstitutions.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import requestInstitutions from './requestInstitutions.js'
import { getInstitutions } from '../api/api.js'
import { error } from '../utils/log.js'

export default function fetchInstitutions() {
  return dispatch => {
    dispatch(requestInstitutions())
    return getInstitutions()
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }
          return dispatch(fetchEachInstitution(json.institutions))
        })
      })
      .then(receiveAction => {
        return dispatch(receiveInstitutions())
      })
      .catch(err => error(err))
  }
}
