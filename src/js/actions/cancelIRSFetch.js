import * as types from '../constants'
import * as IRSPollingId from './IRSPollingId.js'

export default function cancelIRSFetch() {
  clearTimeout(IRSPollingId.get())
  return {
    type: types.CANCEL_IRS_FETCH
  }
}
