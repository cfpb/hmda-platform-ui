import clearFilings from './clearFilings'
import fetchFiling from './fetchFiling.js'
import receiveFilings from './receiveFilings.js'
import * as FilingPeriod from './FilingPeriod.js'

export default function fetchEachFiling(filings) {
  return dispatch => {
    dispatch(clearFilings())
    return Promise.all(
      filings.filter(filing => {
        return filing.period === FilingPeriod.get()
      }).map(filing => {
        return dispatch(fetchFiling(filing))
      })
    ).then(() => dispatch(receiveFilings()))
  }
}
