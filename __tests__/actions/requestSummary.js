import requestSummary from '../../src/js/actions/requestSummary.js'

describe('requestSummary', () => {
  it('checks for http errors', () => {
    expect(requestSummary()).toBe(true)
    expect(requestSummary({httpStatus: 401})).toBe(true)
    expect(requestSummary({})).toBe(false)
    expect(requestSummary({httpStatus: 200})).toBe(false)
  })
})
