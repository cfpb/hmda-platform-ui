import receiveIRS from './receiveIRS.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import { getId } from './Submission.js'
import requestIRS from './requestIRS.js'
import * as IRSPollingId from './IRSPollingId.js'
import { getIRS } from '../api/api.js'
import { error } from '../utils/log.js'

export default function fetchIRS() {
  return dispatch => {
    dispatch(requestIRS())
    const poller = () => {
      return getIRS(getId())
        .then(json => {
          return hasHttpError(json).then(hasError => {
            if (hasError) {
              if (json.status === 404)
                return IRSPollingId.set(setTimeout(poller, 1000))
              else {
                dispatch(receiveError(json))
                throw new Error(`${json.status}: ${json.statusText}`)
              }
            }
            return dispatch(receiveIRS(json))
          })
        })
        .catch(err => error(err))
    }
    poller()
  }
}
