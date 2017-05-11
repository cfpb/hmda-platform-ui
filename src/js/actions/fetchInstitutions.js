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
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        return dispatch(receiveInstitutions(json))
      })
      .then(receiveAction => {
        dispatch(fetchEachInstitution(receiveAction.institutions))
      })
      .catch(err => console.error(err))
  }
}
