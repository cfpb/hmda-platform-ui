import fileSaver from 'file-saver'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import requestCSV from './requestCSV.js'
import { getCSV } from '../api/api.js'
import { error } from '../utils/log.js'

// downloading the csv edit reports, no reducer required
export default function fetchCSV(institutionId, filing, submissionId) {
  return dispatch => {
    // pass data to action for analytics
    dispatch(requestCSV(institutionId, filing, submissionId))
    return getCSV({
      id: institutionId,
      filing: filing,
      submission: submissionId
    })
      .then(csv => {
        return hasHttpError(csv).then(hasError => {
          if (hasError) {
            dispatch(receiveError(csv))
            throw new Error(`${csv.status}: ${csv.statusText}`)
          }
          return fileSaver.saveAs(
            new Blob([csv], { type: 'text/csv;charset=utf-16' }),
            `${submissionId}-full-edit-report.csv`
          )
        })
      })
      .catch(err => error(err))
  }
}
