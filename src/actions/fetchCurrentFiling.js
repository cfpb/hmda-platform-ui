import fetchFiling from './fetchFiling.js'

export default function fetchCurrentFiling(filings) {
  return (dispatch, getState) => {
    const period = getState().app.filingPeriod
    const filing = filings.filter(filing => {
      return filing.period === period
    })[0]
    if (filing) return dispatch(fetchFiling(filing))
  }
}
