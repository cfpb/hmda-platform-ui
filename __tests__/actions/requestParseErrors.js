jest.unmock('../../src/js/actions/requestParseErrors.js')
import * as types from '../../src/js/constants'
import requestParseErrors from '../../src/js/actions/requestParseErrors.js'

describe('requestParseErrors', () => {
  it('checks for http errors', () => {
    expect(requestParseErrors()).toBe(true)
    expect(requestParseErrors({httpStatus: 401})).toBe(true)
    expect(requestParseErrors({})).toBe(false)
    expect(requestParseErrors({httpStatus: 200})).toBe(false)
  })
})
