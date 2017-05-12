jest.unmock('../../src/js/actions/hideConfirm.js')
import * as types from '../../src/js/constants'
import hideConfirm from '../../src/js/actions/hideConfirm.js'

describe('hideConfirm', () => {
  it('checks for http errors', () => {
    expect(hideConfirm()).toBe(true)
    expect(hideConfirm({httpStatus: 401})).toBe(true)
    expect(hideConfirm({})).toBe(false)
    expect(hideConfirm({httpStatus: 200})).toBe(false)
  })
})
