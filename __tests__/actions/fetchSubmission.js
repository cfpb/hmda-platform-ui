import fetchSubmission from '../../src/js/actions/fetchSubmission.js'

describe('fetchSubmission', () => {
  it('checks for http errors', () => {
    expect(fetchSubmission()).toBe(true)
    expect(fetchSubmission({httpStatus: 401})).toBe(true)
    expect(fetchSubmission({})).toBe(false)
    expect(fetchSubmission({httpStatus: 200})).toBe(false)
  })
})
