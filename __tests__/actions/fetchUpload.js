import fetchUpload from '../../src/js/actions/fetchUpload.js'

describe('fetchUpload', () => {
  it('checks for http errors', () => {
    expect(fetchUpload()).toBe(true)
    expect(fetchUpload({httpStatus: 401})).toBe(true)
    expect(fetchUpload({})).toBe(false)
    expect(fetchUpload({httpStatus: 200})).toBe(false)
  })
})
