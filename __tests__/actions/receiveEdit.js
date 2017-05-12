import receiveEdit from '../../src/js/actions/receiveEdit.js'

describe('receiveEdit', () => {
  it('checks for http errors', () => {
    expect(receiveEdit()).toBe(true)
    expect(receiveEdit({httpStatus: 401})).toBe(true)
    expect(receiveEdit({})).toBe(false)
    expect(receiveEdit({httpStatus: 200})).toBe(false)
  })
})
