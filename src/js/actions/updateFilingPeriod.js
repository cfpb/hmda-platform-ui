import * as types from '../constants'
import * as FilingPeriod from './FilingPeriod.js'

export default function updateFilingPeriod(filingPeriod) {
  filingPeriod = filingPeriod + ''
  FilingPeriod.set(filingPeriod)

  return {
    type: types.UPDATE_FILING_PERIOD,
    filingPeriod: filingPeriod
  }
}
