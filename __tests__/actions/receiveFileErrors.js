jest.unmock('../../src/js/actions/receiveFileErrors.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import receiveFileErrors from '../../src/js/actions/receiveFileErrors.js'

describe('receiveFileErrors', () => {
  it('creates a receiveFileErrors action', () => {
    expect(receiveFileErrors(['oi'], '123')).toEqual({
      type: types.RECEIVE_FILE_ERRORS,
      errors: ['oi'],
      id: '123'
    })
  })
})
