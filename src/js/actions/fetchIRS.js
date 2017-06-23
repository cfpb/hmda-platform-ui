import receiveIRS from './receiveIRS.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import { getId } from './Submission.js'
import requestIRS from './requestIRS.js'
import * as IRSPollingId from './IRSPollingId.js'
import { getIRS } from '../api/api.js'

export default function fetchIRS() {
  return dispatch => {
    dispatch(requestIRS())
    const poller = () => {
      return getIRS(getId())
        .then(json => {
          return hasHttpError(json).then(hasError => {
            if(hasError) return IRSPollingId.set(setTimeout(poller, 1000))
            return dispatch(receiveIRS(json))
          })
        })
        .catch(err => console.error(err))
    }
    poller()
  }
}
