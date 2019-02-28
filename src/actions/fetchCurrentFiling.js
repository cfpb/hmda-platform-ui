import fetchFiling from './fetchFiling.js'
import fetchNewFiling from './fetchNewFiling.js'

export default function fetchCurrentFiling(institution) {
  return (dispatch, getState) => {
    const period = getState().app.filingPeriod

    let filing = institution.filings.filter(filing => {
      return filing.period === period
    })[0]

    if (institution.institution.lei === '54930075V56LV2823P16') {
      filing = {
        end: 0,
        filingRequired: true,
        lei: '54930075V56LV2823P16',
        period: '2018',
        start: 1547682918105,
        status: {
          code: 2,
          message: 'in-progress'
        }
      }
    }

    if (filing) return dispatch(fetchFiling(filing))

    return dispatch(
      fetchNewFiling({
        lei: institution.institution.lei,
        period: period
      })
    )
  }
}
