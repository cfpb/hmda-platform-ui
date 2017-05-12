import requestSubmission from '../../src/js/actions/requestSubmission.js'

describe('requestSubmission', () => {
  it('checks for http errors', () => {
    expect(requestSubmission()).toBe(true)
    expect(requestSubmission({httpStatus: 401})).toBe(true)
    expect(requestSubmission({})).toBe(false)
    expect(requestSubmission({httpStatus: 200})).toBe(false)
  })
})
