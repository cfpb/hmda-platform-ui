import fetchNewSubmission from '../../src/js/actions/fetchNewSubmission.js'

describe('fetchNewSubmission', () => {
  it('checks for http errors', () => {
    expect(fetchNewSubmission()).toBe(true)
    expect(fetchNewSubmission({httpStatus: 401})).toBe(true)
    expect(fetchNewSubmission({})).toBe(false)
    expect(fetchNewSubmission({httpStatus: 200})).toBe(false)
  })
})
