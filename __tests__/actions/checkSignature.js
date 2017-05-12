jest.unmock('../../src/js/actions/checkSignature.js')
import * as types from '../../src/js/constants'
import checkSignature from '../../src/js/actions/checkSignature.js'

describe('checkSignature', () => {
  it('creates an action to signal a signature checkbox', () => {
    expect(checkSignature(true)).toEqual({
      type: types.CHECK_SIGNATURE,
      checked: true
    })
  })
})
