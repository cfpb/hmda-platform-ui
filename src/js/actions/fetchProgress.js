import receiveSubmission from './receiveSubmission.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import { getSubmission } from '../api/api.js'

export default function fetchProgress(id) {
  return dispatch => {
    return getSubmission(id)
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        return dispatch(receiveSubmission(json))
      })
      .catch(err => console.error(err))
  }
}
