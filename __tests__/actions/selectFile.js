import selectFile from '../../src/js/actions/selectFile.js'

describe('selectFile', () => {
  it('checks for http errors', () => {
    expect(selectFile()).toBe(true)
    expect(selectFile({httpStatus: 401})).toBe(true)
    expect(selectFile({})).toBe(false)
    expect(selectFile({httpStatus: 200})).toBe(false)
  })
})
