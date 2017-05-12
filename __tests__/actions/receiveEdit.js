jest.unmock('../../src/js/actions/receiveEdit.js')
import * as types from '../../src/js/constants'
import receiveEdit from '../../src/js/actions/receiveEdit.js'

describe('receiveEdit', () => {
  it('creates an action to signal that an edit has been acquired', () => {
    const data = {
      edit: 'a',
      rows: 'b',
      count: 1,
      total: 2,
      _links: 'c'
    }

    expect(receiveEdit(data)).toEqual({
      type: types.RECEIVE_EDIT,
      edit: 'a',
      rows: 'b',
      pagination: {
        count: 1,
        total: 2,
        _links: 'c'
      }
    })
  })
})
