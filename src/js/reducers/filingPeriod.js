/*
 * Set the default current filing period
 */
export const filingPeriod = (state = '2017', action) => {
  switch (action.type) {
  case UPDATE_FILING_PERIOD:
    return action.filingPeriod
  default:
    return state
  }
}
