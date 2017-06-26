import receiveSubmission from './receiveSubmission.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import { getSubmission } from '../api/api.js'

export default function fetchProgress(id) {
  return dispatch => {
    return getSubmission(id)
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if(hasError){
            dispatch(receiveError(json))
            throw new Error(`${json.status}: ${json.statusText}`)
          }
          return dispatch(receiveSubmission(json))
        })
      })
      .catch(err => console.error(err))
  }
}
