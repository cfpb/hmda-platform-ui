import { combineReducers } from 'redux'
import {
  REQUEST_INSTITUTIONS,
  RECEIVE_INSTITUTIONS,
  RECEIVE_INSTITUTION,
  CLEAR_FILINGS,
  UPDATE_FILING_PERIOD,
  REQUEST_FILING,
  RECEIVE_FILING,
  RECEIVE_SUBMISSION,
  SELECT_FILE,
  SHOW_CONFIRM,
  HIDE_CONFIRM,
  PICK_SORT,
  UPLOAD_PROGRESS,
  UPLOAD_COMPLETE,
  UPLOAD_ERROR,
  REQUEST_EDITS_BY_TYPE,
  REQUEST_EDITS_BY_ROW,
  RECEIVE_EDITS_BY_TYPE,
  RECEIVE_EDITS_BY_ROW,
  REQUEST_EDIT_POST,
  RECEIVE_EDIT_POST,
  REQUEST_IRS,
  RECEIVE_IRS,
  REQUEST_SIGNATURE,
  RECEIVE_SIGNATURE,
  REQUEST_SIGNATURE_POST,
  RECEIVE_SIGNATURE_POST,
  REQUEST_SUMMARY,
  RECEIVE_SUMMARY,
  UPDATE_STATUS,
  CHECK_SIGNATURE,
  REQUEST_PARSE_ERRORS,
  RECEIVE_PARSE_ERRORS
} from '../constants'

const defaultUpload = {
  uploading: false,
  file: null,
  errors: []
}

const defaultConfirmation = {
  showing: false,
  id: null,
  filing: null
}

const defaultStatus = {
  code: null,
  message: ''
}

const defaultSubmission = {
  id: null,
  status: defaultStatus,
  isFetching: false
}

const defaultEdits = {
  isFetching: false,
  types: {},
  rows: [],
  groupByRow: false
}

//empty action logger, temporary / for debugging
export const auth = (state = {}, action) => {
  return state
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
  case RECEIVE_FILING:
    return [
      ...state,
      action.filing
    ]
  case CLEAR_FILINGS:
    return []
  default:
    return state
  }
}

/*
 * Set the default current filing period
 */
export const filingPeriod = (state = '2017', action) => {
  switch (action.type) {
  case UPDATE_FILING_PERIOD:
    return action.filingPeriod
  default:
    return state
  }
}

/*
 * Maintain data on the current upload
 */
export const upload = (state = defaultUpload, action) => {
  switch (action.type) {
  case SELECT_FILE:
    return {
      ...state,
      file: action.file,
      errors: action.errors
    }
  default:
    return state
  }
}

/*
 * Track confirmation modal for refiling
 */
export const confirmation = (state = defaultConfirmation, action) => {
  switch (action.type) {
  case SHOW_CONFIRM:
    return {
      showing: action.showing,
      id: action.id,
      filing: action.filing,
      code: action.code
    }
  case HIDE_CONFIRM:
    return {
      ...state,
      showing: action.showing,
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
  let currentSubmission

  switch (action.type) {
    case REQUEST_FILING:
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

export const status = (state = defaultStatus, action) => {
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
      return {
        ...state,
        types: action.edits
      }
    case RECEIVE_EDITS_BY_ROW:
      return {
        ...state,
        rows: action.edits
      }
    case RECEIVE_EDIT_POST: {
      const clonedState = {...state}
      const edits = []
      state.types.macro.edits.forEach((edit) => {
        if(edit.edit !== action.data.edit) edits.push(edit)
        else edits.push({
          ...edit,
          justifications: action.data.justifications
        })
      })

      clonedState.types.macro.edits = edits
      return clonedState
    }
    case PICK_SORT: {
      return {
        ...state,
        groupByRow: action.groupByRow
      }
    }
    default:
      return state
  }
}

const defaultIRS = {
  isFetching: false,
  msas: [],
  status: defaultSubmission.status
}

export const irs = (state = defaultIRS, action) => {
  switch (action.type) {

    case REQUEST_IRS:
      return {
        ...state,
        isFetching: true
      }

    case RECEIVE_IRS:
      return {
        ...state,
        isFetching: false,
        msas: action.msas
      }

    default:
      return state
  }
}

const defaultSignature = {
  isFetching: false,
  timestamp: null,
  receipt: null,
  status: defaultSubmission.status,
  checked: false
}

export const signature = (state = defaultSignature, action) => {
  switch (action.type) {

    case REQUEST_SIGNATURE:
      return {
        ...state,
        isFetching: true
      }

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

    case CHECK_SIGNATURE:
      return {
        ...state,
        isFetching: false,
        checked: action.checked
      }

    default:
      return state
  }
}

const defaultSummary = {
  isFetching: false,
  respondent: {},
  file: {}
}

export const summary = (state = defaultSummary, action) => {
  switch (action.type) {
    case REQUEST_SUMMARY:
      return {
        ...state,
        isFetching: true
      }

    case RECEIVE_SUMMARY:
      return {
        ...state,
        isFetching: false,
        respondent: action.respondent,
        file: action.file
      }

    default:
      return state
  }
}

const defaultParseErrors = {
  isFetching: false,
  transmittalSheetErrors: [],
  larErrors: []
}

export const parseErrors = (state = defaultParseErrors, action) => {
  switch(action.type) {
    case REQUEST_PARSE_ERRORS:
      return {
        ...state,
        isFetching: true
      }

    case RECEIVE_PARSE_ERRORS:
      return {
        isFetching: false,
        transmittalSheetErrors: action.transmittalSheetErrors,
        larErrors: action.larErrors
      }

    default:
      return state
  }
}

export default combineReducers({
  auth,
  institutions,
  filings,
  filingPeriod,
  submission,
  upload,
  confirmation,
  edits,
  irs,
  signature,
  summary,
  parseErrors
})
