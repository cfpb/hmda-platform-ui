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
  UPLOAD_ERROR
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
  isFetching: true,
  submission: defaultSubmission
}

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

export default combineReducers({
  institutions,
  filings,
  submission,
  upload
})
