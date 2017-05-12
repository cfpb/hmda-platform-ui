jest.unmock('../../src/js/actions/hideConfirm.js')
import * as types from '../../src/js/constants'
import hideConfirm from '../../src/js/actions/hideConfirm.js'

describe('hideConfirm', () => {
  it('creates an action signalling hiding of the confirmation modal', () => {
    expect(hideConfirm()).toEqual({
        type: types.HIDE_CONFIRM,
        showing: false
      })
  })
})
