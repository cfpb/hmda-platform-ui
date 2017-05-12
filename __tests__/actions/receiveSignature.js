import receiveSignature from '../../src/js/actions/receiveSignature.js'

describe('receiveSignature', () => {
  it('checks for http errors', () => {
    expect(receiveSignature()).toBe(true)
    expect(receiveSignature({httpStatus: 401})).toBe(true)
    expect(receiveSignature({})).toBe(false)
    expect(receiveSignature({httpStatus: 200})).toBe(false)
  })
})
