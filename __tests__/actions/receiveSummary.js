jest.unmock('../../src/js/actions/receiveSummary.js')
import * as types from '../../src/js/constants'
import receiveSummary from '../../src/js/actions/receiveSummary.js'

describe('receiveSummary', () => {
  it('checks for http errors', () => {
    expect(receiveSummary()).toBe(true)
    expect(receiveSummary({httpStatus: 401})).toBe(true)
    expect(receiveSummary({})).toBe(false)
    expect(receiveSummary({httpStatus: 200})).toBe(false)
  })
})
