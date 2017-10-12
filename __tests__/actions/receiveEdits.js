jest.unmock('../../src/js/actions/receiveEdits.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import receiveEdits from '../../src/js/actions/receiveEdits.js'

describe('receiveEdits', () => {
  it('creates an action to signal that edits have been acquired', () => {
    const data = { a: 1 }
    expect(receiveEdits(data)).toEqual({
      type: types.RECEIVE_EDITS,
      edits: data
    })
  })
})
