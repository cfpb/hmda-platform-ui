import updateStatus from './updateStatus.js'
import requestVerifyMacro from './requestVerifyMacro.js'
import requestVerifyQuality from './requestVerifyQuality.js'
import verifyMacro from './verifyMacro.js'
import verifyQuality from './verifyQuality.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import { getId } from './Submission.js'
import { postVerify } from '../api/api.js'

export default function fetchVerify(type, checked) {
  return dispatch => {
    if(type === 'quality') dispatch(requestVerifyQuality())
    else dispatch(requestVerifyMacro())

    return postVerify(getId(), type, checked)
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if(hasError){
            dispatch(receiveError(json))
            throw new Error(`${json.status}: ${json.statusText}`)
          }

          if(type === 'quality') dispatch(verifyQuality(checked))
          else dispatch(verifyMacro(checked))

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
