import receiveSummary from './receiveSummary.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import { getId } from './Submission.js'
import requestSummary from './requestSummary.js'
import { getSummary } from '../api/api.js'

export default function fetchSummary() {
  return dispatch => {
    dispatch(requestSummary())
    return getSummary(getId())
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if(hasError){
            dispatch(receiveError(json))
            throw new Error(`${json.status}: ${json.statusText}`)
          }
          return dispatch(receiveSummary(json))
        })
      })
      .catch(err => console.error(err))
  }
}
