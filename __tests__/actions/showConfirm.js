jest.unmock('../../src/js/actions/showConfirm.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import showConfirm from '../../src/js/actions/showConfirm.js'

describe('showConfirm', () => {
  it('creates an action to signal display of the refile confirmation modal', () => {
    expect(showConfirm()).toEqual({
      type: types.SHOW_CONFIRM,
      showing: true
    })
  })
})
