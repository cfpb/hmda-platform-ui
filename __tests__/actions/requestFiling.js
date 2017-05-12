import requestFiling from '../../src/js/actions/requestFiling.js'

describe('requestFiling', () => {
  it('checks for http errors', () => {
    expect(requestFiling()).toBe(true)
    expect(requestFiling({httpStatus: 401})).toBe(true)
    expect(requestFiling({})).toBe(false)
    expect(requestFiling({httpStatus: 200})).toBe(false)
  })
})
