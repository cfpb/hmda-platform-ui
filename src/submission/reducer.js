import {
  RECEIVE_SUBMISSION,
  SELECT_FILE,
  REQUEST_SUBMISSION,
  UPDATE_STATUS,
  REFRESH_STATE
} from '../constants'
import { UNINITIALIZED } from '../constants/statusCodes.js'

const defaultSubmission = {
  id: null,
  filename: '',
  status: {
    code: UNINITIALIZED,
    message: ''
  },
  isFetching: false
}

/*
 * Maintain the status of the current submission
 * Set isFetching to true when a request is made
 * Set isFetching to false and update the submission when new data is received
 * Update the submission status code and message when the upload completes or fails
 */
export default (state = defaultSubmission, action) => {
  let currentSubmission

  switch (action.type) {
    case RECEIVE_SUBMISSION:
      return {
        isFetching: false,
        filename: action.fileName,
        id: action.id,
        status: action.status
      }
    case SELECT_FILE:
      return {
        ...state,
        filename: action.file.name
      }
    case REQUEST_SUBMISSION:
      return {
        ...state,
        isFetching: true
      }
    case UPDATE_STATUS:
      return {
        ...state,
        status: action.status
      }
    case REFRESH_STATE:
      return defaultSubmission
    default:
      return state
  }
}
