import fetchFiling from './fetchFiling.js'

export default function fetchFilingsByPeriod(period) {
  return (dispatch, getState) => {
    const institutions = getState().app.institutions.institutions
    Object.keys(institutions).forEach(key => {
      const filing = institutions[key].filings.filter(filing => {
        return filing.period === period
      })[0]
      if (filing) return dispatch(fetchFiling(filing))
    })
  }
}
