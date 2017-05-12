import uploadComplete from '../../src/js/actions/uploadComplete.js'

describe('uploadComplete', () => {
  it('checks for http errors', () => {
    expect(uploadComplete()).toBe(true)
    expect(uploadComplete({httpStatus: 401})).toBe(true)
    expect(uploadComplete({})).toBe(false)
    expect(uploadComplete({httpStatus: 200})).toBe(false)
  })
})
