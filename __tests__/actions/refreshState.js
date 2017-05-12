jest.unmock('../../src/js/actions/refreshState.js')
import * as types from '../../src/js/constants'
import refreshState from '../../src/js/actions/refreshState.js'

describe('refreshState', () => {
  it('creates an action to refresh the state', () => {
    expect(refreshState()).toEqual({
      type: types.REFRESH_STATE
    })
  })
})
