import receiveFiling from './receiveFiling.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import requestFiling from './requestFiling.js'
import { createFiling } from '../api/api.js'
import { error } from '../utils/log.js'

export default function fetchNewFiling(filing) {
  if (filing.lei === '54930075V56LV2823P16') {
    return dispatch => {
      return dispatch(
        receiveFiling({
          filing: {
            end: 0,
            filingRequired: true,
            lei: '54930075V56LV2823P16',
            period: '2018',
            start: 1547682918105,
            status: {
              code: 2,
              message: 'in-progress'
            }
          },
          submissions: []
        })
      )
    }
  }
  return dispatch => {
    dispatch(requestFiling(filing))
    return createFiling(filing.lei, filing.period)
      .then(json => {
        return hasHttpError(json).then(hasError => {
          if (hasError) {
            dispatch(receiveError(json))
            throw new Error(json && `${json.status}: ${json.statusText}`)
          }
          return dispatch(receiveFiling(json))
        })
      })
      .catch(err => {
        error(err)
      })
  }
}
