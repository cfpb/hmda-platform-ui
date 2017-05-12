import fetchSummary from '../../src/js/actions/fetchSummary.js'

describe('fetchSummary', () => {
  it('checks for http errors', () => {
    expect(fetchSummary()).toBe(true)
    expect(fetchSummary({httpStatus: 401})).toBe(true)
    expect(fetchSummary({})).toBe(false)
    expect(fetchSummary({httpStatus: 200})).toBe(false)
  })
})
