import fetchEachFiling from './fetchEachFiling.js'
import receiveInstitution from './receiveInstitution.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import { getInstitution } from '../api/api.js'
import requestInstitution from './requestInstitution.js'

export default function fetchInstitution(institution, fetchFilings = true) {
  return dispatch => {
    dispatch(requestInstitution())
    return getInstitution(institution.id)
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if(hasError) throw new Error(JSON.stringify(dispatch(receiveError(json))))
          dispatch(receiveInstitution(json))
          if(json.filings && fetchFilings){
            return dispatch(fetchEachFiling(json.filings))
          }
        })
      })
      .catch(err => console.error(err))
  }
}
