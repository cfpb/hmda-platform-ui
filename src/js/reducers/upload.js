import * as types from '../constants'

const defaultUpload = {
  uploading: false,
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
  case UPLOAD_COMPLETE:
    return {
      ...state,
      uploading: false
    }
  case REFRESH_STATE:
    return defaultUpload
  default:
    return state
  }
}
