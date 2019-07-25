import { UPDATE_FILING_PERIOD } from '../constants'
/*
 * Set the default current filing period
 */
export default (state = '2019', action) => {
  state = window.location.pathname.substring(8,12)
  switch (action.type) {
    case UPDATE_FILING_PERIOD:
      return action.filingPeriod
    default:
      return state
  }
}
