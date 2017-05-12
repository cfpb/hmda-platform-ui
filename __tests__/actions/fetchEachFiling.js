import fetchEachFiling from '../../src/js/actions/fetchEachFiling.js'

describe('fetchEachFiling', () => {
  it('checks for http errors', () => {
    expect(fetchEachFiling()).toBe(true)
    expect(fetchEachFiling({httpStatus: 401})).toBe(true)
    expect(fetchEachFiling({})).toBe(false)
    expect(fetchEachFiling({httpStatus: 200})).toBe(false)
  })
})
