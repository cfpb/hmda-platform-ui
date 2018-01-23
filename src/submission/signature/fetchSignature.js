import updateStatus from '../updateStatus.js'
import receiveSignature from './receiveSignature.js'
import receiveError from '../../receiveError.js'
import hasHttpError from '../../utils/hasHttpError.js'
import { getId } from '../submission.js'
import requestSignature from './requestSignature.js'
import { getSignature } from '../../api/api.js'
import { error } from '../../utils/log.js'

export default function fetchSignature() {
  return dispatch => {
    dispatch(requestSignature())
    return getSignature(getId())
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }
          dispatch(receiveSignature(json))
          return dispatch(updateStatus(json.status))
        })
      })
      .catch(err => error(err))
  }
}
