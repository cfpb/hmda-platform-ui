import * as types from '../constants'

/*
institutionId, filing, submissionId only required for analytics
*/

export default function requestCSV(institutionId, filing, submissionId) {
  return {
    type: types.REQUEST_CSV,
    institutionId: institutionId,
    filing: filing,
    submissionId: submissionId
  }
}
