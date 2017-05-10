export default function updateFilingPeriod(filingPeriod) {
  filingPeriod = filingPeriod + ''
  currentFilingPeriod = filingPeriod

  return {
    type: types.UPDATE_FILING_PERIOD,
    filingPeriod: filingPeriod
  }
}
