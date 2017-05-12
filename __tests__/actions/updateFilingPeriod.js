jest.unmock('../../src/js/actions/updateFilingPeriod.js')
import * as types from '../../src/js/constants'
import updateFilingPeriod from '../../src/js/actions/updateFilingPeriod.js'

describe('updateFilingPeriod', () => {
  it('checks for http errors', () => {
    expect(updateFilingPeriod()).toBe(true)
    expect(updateFilingPeriod({httpStatus: 401})).toBe(true)
    expect(updateFilingPeriod({})).toBe(false)
    expect(updateFilingPeriod({httpStatus: 200})).toBe(false)
  })
})
