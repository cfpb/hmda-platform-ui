import { SELECT_FILE,SELECT_NEW_FILE,SET_FILENAME, UPLOAD_START,UPLOAD_PROGRESS,UPLOAD_COMPLETE,REFRESH_STATE } from '../constants'

const defaultUpload = {
  uploading: false,
  percentUploaded: 0,
  file: null,
  newFile: null,
  filename: '',
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
      errors: action.errors,
      filename: action.file.name,
      newFile: null
    }
  case SELECT_NEW_FILE:
    return {
      ...state,
      newFile: action.file
    }
  case SET_FILENAME:
      return {
        ...state,
        filename: action.filename
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
      percentUploaded: 100,
      file: null,
    }
  case REFRESH_STATE:
    return defaultUpload
  default:
    return state
  }
}
