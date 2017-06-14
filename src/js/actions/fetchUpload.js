import * as AccessToken from '../api/AccessToken.js'
import { getId } from './Submission.js'
import * as Poller from './Poller.js'
import getUploadUrl from '../api/getUploadUrl.js'
import pollForProgress from './pollForProgress.js'
import uploadComplete from './uploadComplete.js'
import uploadProgress from './uploadProgress.js'
import uploadError from './uploadError.js'
import updateStatus from './updateStatus.js'
import uploadStart from './uploadStart.js'

export default function fetchUpload(file) {
  return dispatch => {
    dispatch(uploadStart())
    var data = new FormData()
    data.append('file', file)

    var xhr = new XMLHttpRequest()

    xhr.addEventListener('load', e => {
      const uploadResponse = JSON.parse(e.target.response)

      dispatch(updateStatus({
        code: uploadResponse.status.code,
        message: uploadResponse.status.message
      }))

      if(e.target.status !== 202) {
        return dispatch(uploadError())
      }

      dispatch(uploadComplete(e))
      Poller.set(true)
      dispatch(pollForProgress(Poller.get()))
    })

    xhr.addEventListener('progress', e => {
      let percent = e.loaded / file.size * 100
      if(percent > 100) percent = 100
      dispatch(uploadProgress(percent))
    })

    xhr.open('POST', getUploadUrl(getId()));
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader('Authorization', 'Bearer ' + AccessToken.get());
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(data);

    return Promise.resolve()
  }
}
