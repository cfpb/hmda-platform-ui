jest.unmock('../../src/js/actions/receiveFilings.js')
import * as types from '../../src/js/constants'
import receiveFilings from '../../src/js/actions/receiveFilings.js'

describe('receiveFilings', () => {
  it('checks for http errors', () => {
    expect(receiveFilings()).toBe(true)
    expect(receiveFilings({httpStatus: 401})).toBe(true)
    expect(receiveFilings({})).toBe(false)
    expect(receiveFilings({httpStatus: 200})).toBe(false)
  })
})
