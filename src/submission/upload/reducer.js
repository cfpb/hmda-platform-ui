import {
  SELECT_FILE,
  SELECT_NEW_FILE,
  RECEIVE_FILE_ERRORS,
  RECEIVE_UPLOAD_ERROR,
  REQUEST_UPLOAD,
  RECEIVE_UPLOAD,
  REFRESH_STATE
} from '../../constants'

const defaultUpload = {
  uploading: false,
  file: null,
  newFile: null,
  errors: [],
  errorFile: null,
  uploadError: null
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
          errors: [],
          errorFile: null,
          uploadError: null
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
    case RECEIVE_FILE_ERRORS:
      return {
        ...state,
        [action.id]: {
          errors: action.errors,
          errorFile: action.file
        }
      }
    case RECEIVE_UPLOAD_ERROR:
      return {
        ...state,
        [action.id]: {
          ...upload,
          uploadError: action.error
        }
      }
    case REQUEST_UPLOAD:
      return {
        ...state,
        [action.id]: {
          ...upload,
          uploading: true
        }
      }
    case RECEIVE_UPLOAD:
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
