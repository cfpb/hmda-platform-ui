jest.unmock('../../src/js/actions/fetchIRS.js')
import * as types from '../../src/js/constants'
import fetchIRS from '../../src/js/actions/fetchIRS.js'

describe('fetchIRS', () => {
  it('checks for http errors', () => {
    expect(fetchIRS()).toBe(true)
    expect(fetchIRS({httpStatus: 401})).toBe(true)
    expect(fetchIRS({})).toBe(false)
    expect(fetchIRS({httpStatus: 200})).toBe(false)
  })
})
