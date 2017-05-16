jest.unmock('../../src/js/actions/hasHttpError.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import hasHttpError from '../../src/js/actions/hasHttpError.js'

describe('hasHttpError', () => {
  it('checks for http errors', () => {
    expect(hasHttpError()).toBe(true)
    expect(hasHttpError({httpStatus: 401})).toBe(true)
    expect(hasHttpError({})).toBe(false)
    expect(hasHttpError({httpStatus: 200})).toBe(false)
  })
})
