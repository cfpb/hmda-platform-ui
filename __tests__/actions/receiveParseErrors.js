jest.unmock('../../src/js/actions/receiveParseErrors.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import receiveParseErrors from '../../src/js/actions/receiveParseErrors.js'

describe('receiveParseErrors', () => {
  it('checks for http errors', () => {
    expect(receiveParseErrors()).toBe(true)
    expect(receiveParseErrors({httpStatus: 401})).toBe(true)
    expect(receiveParseErrors({})).toBe(false)
    expect(receiveParseErrors({httpStatus: 200})).toBe(false)
  })
})
