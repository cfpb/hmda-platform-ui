import requestCSV from '../../src/js/actions/requestCSV.js'

describe('requestCSV', () => {
  it('checks for http errors', () => {
    expect(requestCSV()).toBe(true)
    expect(requestCSV({httpStatus: 401})).toBe(true)
    expect(requestCSV({})).toBe(false)
    expect(requestCSV({httpStatus: 200})).toBe(false)
  })
})
