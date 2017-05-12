import requestEdits from '../../src/js/actions/requestEdits.js'

describe('requestEdits', () => {
  it('checks for http errors', () => {
    expect(requestEdits()).toBe(true)
    expect(requestEdits({httpStatus: 401})).toBe(true)
    expect(requestEdits({})).toBe(false)
    expect(requestEdits({httpStatus: 200})).toBe(false)
  })
})
