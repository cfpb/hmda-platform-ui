jest.unmock('../../src/js/actions/receiveError.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import receiveError from '../../src/js/actions/receiveError.js'

describe('receiveError', () => {
 it('creates an action to signal receiving an error', () => {
    expect(receiveError('b')).toEqual({
      type: types.RECEIVE_ERROR,
      error: 'b'
    })
  })
})
