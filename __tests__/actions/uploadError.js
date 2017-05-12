jest.unmock('../../src/js/actions/uploadError.js')
import * as types from '../../src/js/constants'
import uploadError from '../../src/js/actions/uploadError.js'

describe('uploadError', () => {
  it('checks for http errors', () => {
    expect(uploadError()).toBe(true)
    expect(uploadError({httpStatus: 401})).toBe(true)
    expect(uploadError({})).toBe(false)
    expect(uploadError({httpStatus: 200})).toBe(false)
  })
})
