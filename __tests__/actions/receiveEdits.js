import receiveEdits from '../../src/js/actions/receiveEdits.js'

describe('receiveEdits', () => {
  it('checks for http errors', () => {
    expect(receiveEdits()).toBe(true)
    expect(receiveEdits({httpStatus: 401})).toBe(true)
    expect(receiveEdits({})).toBe(false)
    expect(receiveEdits({httpStatus: 200})).toBe(false)
  })
})
