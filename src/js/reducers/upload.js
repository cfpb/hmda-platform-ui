import { SELECT_FILE,SELECT_NEW_FILE,UPLOAD_START,UPLOAD_PROGRESS,UPLOAD_COMPLETE,REFRESH_STATE } from '../constants'

const defaultUpload = {
  uploading: false,
  percentUploaded: 0,
  file: null,
  newFile: null,
  errors: []
}

/*
 * Maintain data on the current upload
 */
export default (state = defaultUpload, action) => {
  switch (action.type) {
  case SELECT_FILE:
    return {
      ...state,
      file: action.file,
      errors: action.errors
    }
  case SELECT_NEW_FILE:
    return {
      ...state,
      newFile: action.file
    }
  case UPLOAD_START:
    return {
      ...state,
      uploading: true
    }
  case UPLOAD_PROGRESS:
    if(!state.uploading) return state
    return {
      ...state,
      percentUploaded: action.percentUploaded
    }
  case UPLOAD_COMPLETE:
    return {
      ...state,
      uploading: false,
      percentUploaded: 100
    }
  case REFRESH_STATE:
    return defaultUpload
  default:
    return state
  }
}
