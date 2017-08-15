import { SELECT_FILE,SELECT_NEW_FILE,SET_FILENAME, UPLOAD_START,UPLOAD_PROGRESS,UPLOAD_COMPLETE,REFRESH_STATE } from '../constants'

const defaultUpload = {
  uploading: false,
  percentUploaded: 0,
  file: null,
  newFile: null,
  filename: '',
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
        errors: action.errors,
        filename: action.file.name,
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
  case SET_FILENAME:
    return {
      ...state,
      [action.id]: {
        ...upload,
        filename: action.filename
      }
    }
  case UPLOAD_START:
    return {
      ...state,
      [action.id]: {
        ...upload,
        uploading: true
      }
    }
  case UPLOAD_PROGRESS:
    if(!upload.uploading) return state
    return {
      ...state,
      [action.id]: {
        ...upload,
        percentUploaded: action.percentUploaded
      }
    }
  case UPLOAD_COMPLETE:
    return {
      ...state,
      [action.id]: {
        ...upload,
        uploading: false,
        percentUploaded: 100,
        file: null,
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
