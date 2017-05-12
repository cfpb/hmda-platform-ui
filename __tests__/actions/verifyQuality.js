jest.unmock('../../src/js/actions/verifyQuality.js')
import * as types from '../../src/js/constants'
import verifyQuality from '../../src/js/actions/verifyQuality.js'

describe('verifyQuality', () => {
  it('checks for http errors', () => {
    expect(verifyQuality()).toBe(true)
    expect(verifyQuality({httpStatus: 401})).toBe(true)
    expect(verifyQuality({})).toBe(false)
    expect(verifyQuality({httpStatus: 200})).toBe(false)
  })
})
