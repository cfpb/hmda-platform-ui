jest.unmock('../../src/js/actions/verifyMacro.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants/index.js'
import verifyMacro from '../../src/js/actions/verifyMacro.js'

describe('verifyMacro', () => {
  it('creates an action to signal macro has been verified', () => {
    expect(verifyMacro(true)).toEqual({
      type: types.VERIFY_MACRO,
      checked: true,
      isFetching: false
    })
  })
})
