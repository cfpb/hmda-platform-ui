import receiveSubmission from './receiveSubmission.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import requestSubmission from './requestSubmission.js'
import { createSubmission } from '../api/api.js'

export default function fetchNewSubmission(id, period) {
  return dispatch => {
    dispatch(requestSubmission())
    return createSubmission(id, period)
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if(hasError) throw new Error(JSON.stringify(dispatch(receiveError(json))))
          return dispatch(receiveSubmission(json))
        })
      })
      .catch(err => console.error(err))
  }
}
