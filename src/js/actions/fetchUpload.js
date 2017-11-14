import * as AccessToken from '../api/AccessToken.js'
import { getId } from './Submission.js'
import * as Poller from './Poller.js'
import { postUpload } from '../api/api.js'
import pollForProgress from './pollForProgress.js'
import updateStatus from './updateStatus.js'
import requestUpload from './requestUpload.js'
import receiveUpload from './receiveUpload.js'
import hasHttpError from './hasHttpError.js'
import receiveError from './receiveError.js'
import { error } from '../utils/log.js'

export default function fetchUpload(file) {
  return dispatch => {
    dispatch(requestUpload())
    const data = new FormData()
    data.append('file', file)
    return postUpload(getId(), data)
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(`${json.status}: ${json.statusText}`)
          }

          dispatch(
            updateStatus({
              ...json.status
            })
          )

          dispatch(receiveUpload(json))

          Poller.set(true)
          dispatch(pollForProgress(Poller.get()))
        })
      })
      .catch(err => error(err))
  }
}
