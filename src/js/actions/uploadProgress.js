import * as types from '../constants'

export default function uploadProgress(percent) {
  return {
    type: types.UPLOAD_PROGRESS,
    percentUploaded: percent
  }
}
