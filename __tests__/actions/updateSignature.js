import updateSignature from '../../src/js/actions/updateSignature.js'

describe('updateSignature', () => {
  it('checks for http errors', () => {
    expect(updateSignature()).toBe(true)
    expect(updateSignature({httpStatus: 401})).toBe(true)
    expect(updateSignature({})).toBe(false)
    expect(updateSignature({httpStatus: 200})).toBe(false)
  })
})
