import { combineReducers } from 'redux'
import {
  RECEIVE_ERROR,
  REFRESH_STATE,
  REQUEST_INSTITUTION,
  RECEIVE_INSTITUTION,
  REQUEST_INSTITUTIONS,
  RECEIVE_INSTITUTIONS,
  CLEAR_FILINGS,
  UPDATE_FILING_PERIOD,
  REQUEST_FILING,
  RECEIVE_FILING,
  RECEIVE_FILINGS,
  REQUEST_SUBMISSION,
  RECEIVE_SUBMISSION,
  SELECT_FILE,
  SELECT_NEW_FILE,
  SHOW_CONFIRM,
  HIDE_CONFIRM,
  PICK_SORT,
  UPLOAD_START,
  UPLOAD_PROGRESS,
  UPLOAD_COMPLETE,
  UPLOAD_ERROR,
  REQUEST_EDITS,
  RECEIVE_EDITS,
  REQUEST_EDIT,
  RECEIVE_EDIT,
  REQUEST_IRS,
  RECEIVE_IRS,
  REQUEST_SIGNATURE,
  RECEIVE_SIGNATURE,
  REQUEST_SIGNATURE_POST,
  RECEIVE_SIGNATURE_POST,
  REQUEST_SUMMARY,
  RECEIVE_SUMMARY,
  VERIFY_QUALITY,
  VERIFY_MACRO,
  UPDATE_STATUS,
  CHECK_SIGNATURE,
  REQUEST_PARSE_ERRORS,
  RECEIVE_PARSE_ERRORS
} from '../constants'



const defaultFilings = {
  filings: [],
  isFetching: false,
}

const defaultStatus = {
  code: 0,
  message: ''
}

const defaultSubmission = {
  id: null,
  status: defaultStatus,
  isFetching: false,
}

const defaultUpload = {
  uploading: false,
  file: null,
  newFile: null,
  errors: []
}

const defaultConfirmation = {
  showing: false,
  code: 0,
  id: null,
  filing: null
}

const defaultParseErrors = {
  isFetching: false,
  transmittalSheetErrors: [],
  larErrors: []
}

const defaultEdits = {
  isFetching: false,
  fetched: false,
  types: {
    syntactical: {edits: []},
    validity: {edits: []},
    quality: {edits: [], verified: false},
    macro: {edits: [], verified: false}
  },
  rows: {}
}

const defaultIRS = {
  isFetching: false,
  msas: [],
  summary: {}
}
const defaultSummary = {
  isFetching: false,
  respondent: {},
  file: {}
}
const defaultPagination = {}
const defaultError = null
const defaultSignature = {
  isFetching: false,
  timestamp: null,
  receipt: null,
  status: defaultSubmission.status,
  checked: false
}


export default combineReducers({
  institution,
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
  parseErrors,
  pagination,
  error
})
