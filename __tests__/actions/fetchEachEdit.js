import fetchEachEdit from '../../src/js/actions/fetchEachEdit.js'

describe('fetchEachEdit', () => {
  it('checks for http errors', () => {
    expect(fetchEachEdit()).toBe(true)
    expect(fetchEachEdit({httpStatus: 401})).toBe(true)
    expect(fetchEachEdit({})).toBe(false)
    expect(fetchEachEdit({httpStatus: 200})).toBe(false)
  })
})
