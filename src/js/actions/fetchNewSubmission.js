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
        return new Promise((resolve, reject) => {
          if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
          dispatch(receiveSubmission(json))
          resolve()
        })
      })
      .catch(err => console.error(err))
  }
}
