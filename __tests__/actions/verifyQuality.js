jest.unmock('../../src/js/actions/verifyQuality.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import verifyQuality from '../../src/js/actions/verifyQuality.js'

describe('verifyQuality', () => {
  it('creates an action to signal quality has been verified', () => {
    expect(verifyQuality(true)).toEqual({
      type: types.VERIFY_QUALITY,
      checked: true,
      isFetching: false
    })
  })
})
