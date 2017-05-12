import receiveSignaturePost from '../../src/js/actions/receiveSignaturePost.js'

describe('receiveSignaturePost', () => {
  it('checks for http errors', () => {
    expect(receiveSignaturePost()).toBe(true)
    expect(receiveSignaturePost({httpStatus: 401})).toBe(true)
    expect(receiveSignaturePost({})).toBe(false)
    expect(receiveSignaturePost({httpStatus: 200})).toBe(false)
  })
})
