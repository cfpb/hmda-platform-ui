import fetchCurrentFiling from './fetchCurrentFiling.js'
import fetchNewFiling from './fetchNewFiling.js'
import receiveInstitution from './receiveInstitution.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import { getInstitution } from '../api/api.js'
import requestInstitution from './requestInstitution.js'
import { error } from '../utils/log.js'

export default function fetchInstitution(institution, fetchFilings = true) {
  return (dispatch, getState) => {
    dispatch(requestInstitution(institution.lei))
    return getInstitution(institution.lei)
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }
          dispatch(receiveInstitution(json))
          if (json.filings.length !== 0 && fetchFilings) {
            return dispatch(fetchCurrentFiling(json.filings))
          } else {
            return dispatch(
              fetchNewFiling({
                lei: institution.lei,
                period: getState().app.filingPeriod
              })
            )
          }
        })
      })
      .catch(err => {
        error(err)
      })
  }
}
