import fetchEachInstitution from './fetchEachInstitution.js'
import receiveInstitutions from './receiveInstitutions.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import requestInstitutions from './requestInstitutions.js'
import { getInstitutions } from '../api/api.js'

export default function fetchInstitutions() {
  return dispatch => {
    dispatch(requestInstitutions())
    return getInstitutions()
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(`${json.status}: ${json.statusText}`)
          }
          return dispatch(receiveInstitutions(json))
        })
      })
      .then(receiveAction => {
        return dispatch(fetchEachInstitution(receiveAction.institutions))
      })
      .catch(err => console.error(err))
  }
}
