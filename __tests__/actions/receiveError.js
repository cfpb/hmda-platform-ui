import receiveError from '../../src/js/actions/receiveError.js'

describe('receiveError', () => {
  it('checks for http errors', () => {
    expect(receiveError()).toBe(true)
    expect(receiveError({httpStatus: 401})).toBe(true)
    expect(receiveError({})).toBe(false)
    expect(receiveError({httpStatus: 200})).toBe(false)
  })
})
