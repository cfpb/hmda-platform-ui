import * as types from '../constants'
import { setId } from './submission.js'

export default function receiveSubmission(data) {
  setId(data.id.sequenceNumber)

  return {
    type: types.RECEIVE_SUBMISSION,
    ...data
  }
}
