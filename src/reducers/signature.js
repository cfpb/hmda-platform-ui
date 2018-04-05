import {
  REQUEST_SIGNATURE,
  RECEIVE_SIGNATURE,
  REQUEST_SIGNATURE_POST,
  RECEIVE_SIGNATURE_POST,
  CHECK_SIGNATURE,
  REFRESH_STATE
} from '../constants'

const defaultSignature = {
  isFetching: false,
  isSubmitting: false,
  timestamp: null,
  receipt: null,
  checked: false
}

export default (state = defaultSignature, action) => {
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
        receipt: action.receipt,
        checked: action.timestamp !== 0
      }

    case REQUEST_SIGNATURE_POST:
      return {
        ...state,
        isSubmitting: true
      }

    case RECEIVE_SIGNATURE_POST:
      return {
        ...state,
        isSubmitting: false,
        timestamp: action.timestamp,
        receipt: action.receipt
      }

    case CHECK_SIGNATURE:
      return {
        ...state,
        isFetching: false,
        checked: action.checked
      }

    case REFRESH_STATE:
      return defaultSignature

    default:
      return state
  }
}
