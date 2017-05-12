jest.unmock('../../src/js/actions/updateFilingPeriod.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import updateFilingPeriod from '../../src/js/actions/updateFilingPeriod.js'

describe('updateFilingPeriod', () => {
  it('creates an action to update the filing period', () => {
    expect(updateFilingPeriod('123')).toEqual({
      type: types.UPDATE_FILING_PERIOD,
      filingPeriod: '123'
    })
  })
})
