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
  POST_IRS,
  REQUEST_SIGNATURE,
  RECEIVE_SIGNATURE,
  REQUEST_SIGNATURE_POST,
  RECEIVE_SIGNATURE_POST,
  POST_SIGNATURE,
  UPDATE_STATUS
} from '../constants'

const defaultUpload = {
  uploading: false,
  bytesUploaded: 0,
  file: null
}

const defaultStatus = {
  code: 1,
  message: ''
}

const defaultSubmission = {
  id: 1,
  status: defaultStatus,
  isFetching: false
}

const defaultEdits = {
  isFetching: false,
  types: {},
  rows: [],
  groupByRow: false
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
export const submission = (state = defaultSubmission, action) => {
  switch (action.type) {
    case REQUEST_SUBMISSION:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_SUBMISSION:
      return {
        isFetching: false,
        id: action.id,
        status: action.status
      }
    case UPDATE_STATUS:
      return {
        ...state,
        status: status(state.status, action)
      }
    default:
      return state
  }
}

const status = (state = defaultStatus, action) => {
  switch(action.type) {
    case UPDATE_STATUS:
      return action.status
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

const defaultIRS = {
  isFetching: false,
  irs: {},
  status: defaultSubmission.status
}

const irs = (state = defaultIRS, action) => {
  switch (action.type) {
    case REQUEST_IRS:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_IRS:
      return {
        ...state,
        irs: action.msas
      }
    case REQUEST_IRS_POST:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_IRS_POST:
      return {
        ...state,
        isChecked: action.status
      }
    default:
      return state
  }
}

/*
this is here to show what defaultSubmission looks like

const defaultSubmission = {
  id: 1,
  status: {
    code: 1,
    message: ''
  }
}
*/

const defaultSignature = {
  isFetching: false,
  timestamp: null,
  receipt: null,
  status: defaultSubmission.status
}

const signature = (state = defaultSignature, action) => {
  switch (action.type) {
    // this is just the REQUEST so only update the isFetching to true
    case REQUEST_SIGNATURE:
      return {
        ...state,
        isFetching: true
      }
    /*
    the response from the GET looks like
    {
      "timestamp": 1457494448191,
      "receipt": "somehash"
    }
    so we just update the timestamp and receipt
    they could still be null, not signed (and will be at least the first time called)
    */
    case RECEIVE_SIGNATURE:
      return {
        ...state,
        isFetching: false,
        timestamp: action.timestamp,
        receipt: action.receipt
      }

    case REQUEST_SIGNATURE_POST:
      return {
        ...state,
        isFetching: true
      }

    case RECEIVE_SIGNATURE_POST:
      return {
        ...state,
        isFetching: false,
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
