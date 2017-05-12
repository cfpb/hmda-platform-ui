import pollForProgress from '../../src/js/actions/pollForProgress.js'

describe('pollForProgress', () => {
  it('checks for http errors', () => {
    expect(pollForProgress()).toBe(true)
    expect(pollForProgress({httpStatus: 401})).toBe(true)
    expect(pollForProgress({})).toBe(false)
    expect(pollForProgress({httpStatus: 200})).toBe(false)
  })
})
