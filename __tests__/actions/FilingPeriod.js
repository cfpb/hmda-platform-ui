import FilingPeriod from '../../src/js/actions/FilingPeriod.js'

describe('FilingPeriod', () => {
  it('checks for http errors', () => {
    expect(FilingPeriod()).toBe(true)
    expect(FilingPeriod({httpStatus: 401})).toBe(true)
    expect(FilingPeriod({})).toBe(false)
    expect(FilingPeriod({httpStatus: 200})).toBe(false)
  })
})
