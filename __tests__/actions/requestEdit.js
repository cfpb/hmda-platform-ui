import requestEdit from '../../src/js/actions/requestEdit.js'

describe('requestEdit', () => {
  it('checks for http errors', () => {
    expect(requestEdit()).toBe(true)
    expect(requestEdit({httpStatus: 401})).toBe(true)
    expect(requestEdit({})).toBe(false)
    expect(requestEdit({httpStatus: 200})).toBe(false)
  })
})
