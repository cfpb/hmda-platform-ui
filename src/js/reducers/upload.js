import { SELECT_FILE,SELECT_NEW_FILE,UPLOAD_START,UPLOAD_PROGRESS,UPLOAD_COMPLETE,REFRESH_STATE } from '../constants'

const defaultUpload = {
  uploading: false,
  file: null,
  newFile: null,
  errors: []
}

const defaultUploads = {}

/*
 * Maintain data on the current upload
 */
export default (state = defaultUploads, action) => {
  const upload = state[action.id] ? state[action.id] : defaultUpload

  switch (action.type) {
  case SELECT_FILE:
    return {
      ...state,
      [action.id]: {
        ...upload,
        file: action.file,
        errors: action.errors
      }
    }
  case SELECT_NEW_FILE:
    return {
      ...state,
      [action.id]: {
        ...upload,
        newFile: action.file
      }
    }
  case UPLOAD_START:
    return {
      ...state,
      [action.id]: {
        ...upload,
        uploading
        : true
      }
    }
  case UPLOAD_COMPLETE:
    return {
      ...state,
      [action.id]: {
        ...upload,
        uploading: false
      }
    }
  case REFRESH_STATE:
    return {
      ...state,
      [action.id]: defaultUpload
    }
  default:
    return state
  }
}
