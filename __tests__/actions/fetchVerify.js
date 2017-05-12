import fetchVerify from '../../src/js/actions/fetchVerify.js'

describe('fetchVerify', () => {
  it('checks for http errors', () => {
    expect(fetchVerify()).toBe(true)
    expect(fetchVerify({httpStatus: 401})).toBe(true)
    expect(fetchVerify({})).toBe(false)
    expect(fetchVerify({httpStatus: 200})).toBe(false)
  })
})
