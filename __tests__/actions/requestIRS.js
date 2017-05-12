import requestIRS from '../../src/js/actions/requestIRS.js'

describe('requestIRS', () => {
  it('checks for http errors', () => {
    expect(requestIRS()).toBe(true)
    expect(requestIRS({httpStatus: 401})).toBe(true)
    expect(requestIRS({})).toBe(false)
    expect(requestIRS({httpStatus: 200})).toBe(false)
  })
})
