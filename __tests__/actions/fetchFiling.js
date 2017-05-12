jest.unmock('../../src/js/actions/fetchFiling.js')
import * as types from '../../src/js/constants'
import fetchFiling from '../../src/js/actions/fetchFiling.js'

describe('fetchFiling', () => {
  it('checks for http errors', () => {
    expect(fetchFiling()).toBe(true)
    expect(fetchFiling({httpStatus: 401})).toBe(true)
    expect(fetchFiling({})).toBe(false)
    expect(fetchFiling({httpStatus: 200})).toBe(false)
  })
})
