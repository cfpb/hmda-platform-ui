import uploadError from '../../src/js/actions/uploadError.js'

describe('uploadError', () => {
  it('checks for http errors', () => {
    expect(uploadError()).toBe(true)
    expect(uploadError({httpStatus: 401})).toBe(true)
    expect(uploadError({})).toBe(false)
    expect(uploadError({httpStatus: 200})).toBe(false)
  })
})
