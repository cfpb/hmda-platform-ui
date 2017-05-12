jest.unmock('../../src/js/actions/updateStatus.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import updateStatus from '../../src/js/actions/updateStatus.js'

describe('updateStatus', () => {
  it('creates an action to update the status', () => {
    const status = {
      code: 10,
      message: ''
    }
    expect(updateStatus(status)).toEqual({
      type: types.UPDATE_STATUS,
      status: status
    })
  })
})
