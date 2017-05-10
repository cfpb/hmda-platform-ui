export default function fetchEachFiling(filings) {
  return dispatch => {
    dispatch(clearFilings())
    return Promise.all(
      filings.filter(filing => {
        return filing.period === currentFilingPeriod
      }).map(filing => {
        return dispatch(fetchFiling(filing))
      })
    ).then(() => dispatch(receiveFilings()))
  }
}
