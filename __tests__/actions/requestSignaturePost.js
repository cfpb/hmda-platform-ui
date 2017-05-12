import requestSignaturePost from '../../src/js/actions/requestSignaturePost.js'

describe('requestSignaturePost', () => {
  it('checks for http errors', () => {
    expect(requestSignaturePost()).toBe(true)
    expect(requestSignaturePost({httpStatus: 401})).toBe(true)
    expect(requestSignaturePost({})).toBe(false)
    expect(requestSignaturePost({httpStatus: 200})).toBe(false)
  })
})
