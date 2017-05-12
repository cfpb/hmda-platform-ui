import clearFilings from '../../src/js/actions/clearFilings.js'

describe('clearFilings', () => {
  it('checks for http errors', () => {
    expect(clearFilings()).toBe(true)
    expect(clearFilings({httpStatus: 401})).toBe(true)
    expect(clearFilings({})).toBe(false)
    expect(clearFilings({httpStatus: 200})).toBe(false)
  })
})
