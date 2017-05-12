import fetchProgress from '../../src/js/actions/fetchProgress.js'

describe('fetchProgress', () => {
  it('checks for http errors', () => {
    expect(fetchProgress()).toBe(true)
    expect(fetchProgress({httpStatus: 401})).toBe(true)
    expect(fetchProgress({})).toBe(false)
    expect(fetchProgress({httpStatus: 200})).toBe(false)
  })
})
