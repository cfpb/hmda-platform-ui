jest.unmock('./receiveError.js')
jest.unmock('./constants')
import * as types from './constants'
import receiveError from './receiveError.js'

describe('receiveError', () => {
  it('creates an action to signal receiving an error', () => {
    expect(receiveError('b')).toEqual({
      type: types.RECEIVE_ERROR,
      error: 'b'
    })
  })
})
