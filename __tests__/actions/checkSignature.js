import checkSignature from '../../src/js/actions/checkSignature.js'

describe('checkSignature', () => {
  it('checks for http errors', () => {
    expect(checkSignature()).toBe(true)
    expect(checkSignature({httpStatus: 401})).toBe(true)
    expect(checkSignature({})).toBe(false)
    expect(checkSignature({httpStatus: 200})).toBe(false)
  })
})
