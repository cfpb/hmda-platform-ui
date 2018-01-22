import clearFilings from './clearFilings'
import fetchFiling from './fetchFiling.js'
import receiveFilings from './receiveFilings.js'

export default function fetchEachFiling(filings) {
  return (dispatch, getState) => {
    dispatch(clearFilings())
    const period = getState().app.filingPeriod
    return Promise.all(
      filings
        .filter(filing => {
          return filing.period === period
        })
        .map(filing => {
          return dispatch(fetchFiling(filing))
        })
    ).then(() => dispatch(receiveFilings()))
  }
}
