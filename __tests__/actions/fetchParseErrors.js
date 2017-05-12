jest.unmock('../../src/js/actions/fetchParseErrors.js')
import * as types from '../../src/js/constants'
import fetchParseErrors from '../../src/js/actions/fetchParseErrors.js'

describe('fetchParseErrors', () => {
  it('checks for http errors', () => {
    expect(fetchParseErrors()).toBe(true)
    expect(fetchParseErrors({httpStatus: 401})).toBe(true)
    expect(fetchParseErrors({})).toBe(false)
    expect(fetchParseErrors({httpStatus: 200})).toBe(false)
  })
})
