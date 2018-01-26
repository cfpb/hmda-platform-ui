import * as AccessToken from '../../api/AccessToken.js'
import { getId } from '../submission.js'
import * as Poller from './poller.js'
import { UPLOADING, FAILED } from '../../constants/statusCodes.js'
import { postUpload } from '../../api/api.js'
import pollForProgress from './pollForProgress.js'
import updateStatus from '../updateStatus.js'
import requestUpload from './requestUpload.js'
import receiveUpload from './receiveUpload.js'
import hasHttpError from '../../utils/hasHttpError.js'
import receiveUploadError from './receiveUploadError.js'
import { error } from '../../utils/log.js'

export default function fetchUpload(file) {
  return dispatch => {
    dispatch(requestUpload())

    const data = new FormData()
    data.append('file', file)

    return postUpload(getId(), data)
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            dispatch(receiveUploadError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }

          dispatch(receiveUpload(json))

          dispatch(updateStatus(json.status))

          Poller.set(true)
          dispatch(pollForProgress(Poller.get()))
        })
      })
      .catch(err => error(err))
  }
}
