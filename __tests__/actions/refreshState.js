import refreshState from '../../src/js/actions/refreshState.js'

describe('refreshState', () => {
  it('checks for http errors', () => {
    expect(refreshState()).toBe(true)
    expect(refreshState({httpStatus: 401})).toBe(true)
    expect(refreshState({})).toBe(false)
    expect(refreshState({httpStatus: 200})).toBe(false)
  })
})
