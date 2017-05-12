jest.unmock('../../src/js/actions/fetchEdits.js')
import * as types from '../../src/js/constants'
import fetchEdits from '../../src/js/actions/fetchEdits.js'

describe('fetchEdits', () => {
  it('checks for http errors', () => {
    expect(fetchEdits()).toBe(true)
    expect(fetchEdits({httpStatus: 401})).toBe(true)
    expect(fetchEdits({})).toBe(false)
    expect(fetchEdits({httpStatus: 200})).toBe(false)
  })
})
