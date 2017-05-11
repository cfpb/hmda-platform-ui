import receiveIRS from './receiveIRS.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import { getId } from './Submission.js'
import requestIRS from './requestIRS.js'
import { getIRS } from '../api/api.js'

export function fetchIRS() {
  return dispatch => {
    dispatch(requestIRS())
    return getIRS(getId())
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        return dispatch(receiveIRS(json))
      })
      .catch(err => console.error(err))
  }
}
