import fileSaver from 'file-saver'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import requestIRSCSV from './requestIRSCSV.js'
import { getIRSCSV } from '../api/api.js'
import { error } from '../utils/log.js'

// downloading the IRS csv, no reducer required
export default function fetchIRSCSV(lei, filing, submissionId) {
  return dispatch => {
    dispatch(requestIRSCSV())
    return getIRSCSV({
      lei: lei,
      filing: filing,
      submission: submissionId
    })
      .then(csv => {
        return hasHttpError(csv).then(hasError => {
          if (hasError) {
            dispatch(receiveError(csv))
            throw new Error(csv && `${csv.status}: ${csv.statusText}`)
          }
          return fileSaver.saveAs(
            new Blob([csv], { type: 'text/csv;charset=utf-16' }),
            `${lei}-${submissionId}-irs-report.csv`
          )
        })
      })
      .catch(err => {
        error(err)
      })
  }
}
