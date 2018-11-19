import * as AccessToken from '../api/AccessToken.js'
import makeUrl from '../api/makeUrl.js'
import { getFilingData } from '../api/fetch.js'
import updateStatus from './updateStatus.js'
import requestUpload from './requestUpload.js'
import receiveUpload from './receiveUpload.js'
import trackProgress from './trackProgress.js'
import updateProgress from './updateProgress.js'
import hasHttpError from './hasHttpError.js'
import receiveUploadError from './receiveUploadError.js'
import { UPLOADING } from '../constants/statusCodes.js'
import { error } from '../utils/log.js'

export default function fetchUpload(file) {
  return dispatch => {
    dispatch(requestUpload())
    dispatch(updateStatus({
      code: UPLOADING,
      message: 'Your file is uploading.'
    }))

    const data = new FormData()
    data.append('file', file)

    var xhr = new XMLHttpRequest()

    xhr.addEventListener('load', e => {
      console.log('LOADED', e)
      try {
        const json = JSON.parse(e.target.response)
        if(e.target.status !== 202) throw new Error(json && `${json.status}: ${json.statusText}`)
        console.log('json in upload', json)
        dispatch(receiveUpload(json))
        dispatch(updateStatus(json.status))
        console.log('trackingprogress')
        dispatch(trackProgress())
      } catch(e) {
        console.log('upload err', e)
        receiveUploadError(e)
      }
    })

    xhr.upload.addEventListener('progress', e => {
      console.log('progress')
      const total = file.size
      const processed = e.loaded > total ? total : e.loaded
      const progress = {
        processed: processed,
        total: total,
        status: {
          code: UPLOADING
        }
      }
      dispatch(updateProgress(progress))
    })

    xhr.open('POST', makeUrl(getFilingData()));
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader('Authorization', 'Bearer ' + AccessToken.get());
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(data);

    return Promise.resolve(xhr)
  }
}
