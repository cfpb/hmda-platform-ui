import { combineReducers } from 'redux'
import {
  REQUEST_INSTITUTIONS,
  RECEIVE_INSTITUTIONS,
  RECEIVE_INSTITUTION,
  CLEAR_FILINGS,
  REQUEST_SUBMISSION,
  RECEIVE_SUBMISSION,
  SELECT_FILE,
  UPLOAD_PROGRESS,
  UPLOAD_COMPLETE,
  UPLOAD_ERROR,
  REQUEST_EDITS_BY_TYPE,
  REQUEST_EDITS_BY_ROW,
  RECEIVE_EDITS_BY_TYPE,
  RECEIVE_EDITS_BY_ROW,
  REQUEST_IRS,
  RECEIVE_IRS,
  REQUEST_SIGNATURE,
  RECEIVE_SIGNATURE
} from '../constants'

const defaultUpload = {
  uploading: false,
  bytesUploaded: 0,
  file: null
}

const defaultSubmission = {
  id: 1,
  status: {
    code: 1,
    message: ''
  }
}

const submissionWrapper = {
  isFetching: false,
  submission: defaultSubmission
}

const defaultEdits = {
  isFetching: false,
  types: {},
  rows: [],
  groupByRow: false
}

const defaultIRS = {
  isFetching: false,
  irs: {}
}

const defaultSignature = {
  isFetching: false,
  timestamp: null,
  receipt: null
}

/*
 * Set isFetching to true when institutions are being requested
 * Set isFetching to false and populate the institutions key
 *   when data is received
 */
export const institutions = (state = {}, action) => {
  switch (action.type) {
  case REQUEST_INSTITUTIONS:
    return {
      ...state,
      isFetching: true
    }
  case RECEIVE_INSTITUTIONS:
    return {
      isFetching: false,
      institutions: action.institutions
    }
  default:
    return state
  }
}

/*
 * Populate a list with data on every filing period for each institution
 * When an filing data for an institution is received, it is added to the list
 * When clear filings is dispatched, empty the list
 */
export const filings = (state = [], action) => {
  switch (action.type) {
  case RECEIVE_INSTITUTION:
    return [
      ...state,
      ...action.institution.filings
    ]
  case CLEAR_FILINGS:
    return []
  default:
    return state
  }
}

/*
 * Maintain data on the current upload
 * When a file is selected, reset bytesUploaded and set the file
 * When upload progress is dispatched, update bytesLoaded
 */
export const upload = (state = defaultUpload, action) => {
  switch (action.type) {
  case SELECT_FILE:
    return {
      ...state,
      bytesUploaded: 0,
      file: action.file
    }
  case UPLOAD_PROGRESS:
    return {
      ...state,
     bytesUploaded: action.xhrProgressEvent.loaded
    }
  default:
    return state
  }
}

/*
 * Maintain the status of the current submission
 * Set isFetching to true when a request is made
 * Set isFetching to false and update the submission when new data is received
 * Update the submission status code and message when the upload completes or fails
 */
export const submission = (state = submissionWrapper, action) => {
  switch (action.type) {
  case REQUEST_SUBMISSION:
    return {
      ...state,
      isFetching: true
    }
  case RECEIVE_SUBMISSION:
    return {
      ...state,
      submission: action.submission
    }
  case UPLOAD_COMPLETE:
    return {
      ...state,
      submission: submissionStatus(state.submission, action)
    }
  case UPLOAD_ERROR:
    return {
      ...state,
      submission: submissionStatus(state.submission, action)
    }
  default:
    return state
  }
}

/*
 * Child of submission which handles updating the nested status code and message
 */
const submissionStatus = (state = defaultSubmission, action) => {
  switch (action.type) {
  case UPLOAD_COMPLETE:
      return {
        ...state,
        status: {
          code: 3,
          message: ''
        }
      }
    case UPLOAD_ERROR:
      return {
        ...state,
        status: {
          code: -1,
          message: 'Error uploading file'
        }
      }
  default:
    return state
  }
}

const edits = (state = defaultEdits, action) => {
  switch (action.type) {
    case REQUEST_EDITS_BY_TYPE:
      return {
        ...state,
        isFetching: true
      }
    case REQUEST_EDITS_BY_ROW:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_EDITS_BY_TYPE:
      console.log(action.edits)
      return {
        ...state,
        types: action.edits
      }
    case RECEIVE_EDITS_BY_ROW:
      return {
        ...state,
        rows: action.edits
      }
    default:
      return state
  }
}

const irs = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_IRS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_IRS:
      return {
        ...state,
        irs: action.msas
      }
    default:
      return state
  }
}

const signature = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_SIGNATURE:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_SIGNATURE:
      return {
        ...state,
        timestamp: action.timestamp,
        receipt: action.receipt
      }
    default:
      return state
  }
}

export default combineReducers({
  institutions,
  filings,
  submission,
  upload,
  edits,
  irs,
  signature
})
