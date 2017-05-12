jest.unmock('../../src/js/actions/showConfirm.js')
import * as types from '../../src/js/constants'
import showConfirm from '../../src/js/actions/showConfirm.js'

describe('showConfirm', () => {
  it('checks for http errors', () => {
    expect(showConfirm()).toBe(true)
    expect(showConfirm({httpStatus: 401})).toBe(true)
    expect(showConfirm({})).toBe(false)
    expect(showConfirm({httpStatus: 200})).toBe(false)
  })
})
