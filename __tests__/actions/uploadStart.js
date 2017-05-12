import uploadStart from '../../src/js/actions/uploadStart.js'

describe('uploadStart', () => {
  it('checks for http errors', () => {
    expect(uploadStart()).toBe(true)
    expect(uploadStart({httpStatus: 401})).toBe(true)
    expect(uploadStart({})).toBe(false)
    expect(uploadStart({httpStatus: 200})).toBe(false)
  })
})
