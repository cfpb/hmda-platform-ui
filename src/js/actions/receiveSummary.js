import * as types from '../constants'

export default function receiveSummary(data) {
  return {
    type: types.RECEIVE_SUMMARY,
    respondent: data.respondent,
    file: data.file
  }
}
