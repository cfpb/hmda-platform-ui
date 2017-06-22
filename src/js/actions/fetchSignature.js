import updateStatus from './updateStatus.js'
import receiveSignature from './receiveSignature.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import { getId } from './Submission.js'
import requestSignature from './requestSignature.js'
import { getSignature } from '../api/api.js'

export default function fetchSignature() {
  return dispatch => {
    dispatch(requestSignature())
    return getSignature(getId())
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if(hasError) throw new Error(JSON.stringify(dispatch(receiveError(json))))
          dispatch(receiveSignature(json))
          return dispatch(updateStatus(
            {
              code: json.status.code,
              message: json.status.message
            }
          ))
        })
      })
      .catch(err => console.error(err))
  }
}
