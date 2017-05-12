jest.unmock('../../src/js/actions/requestEdit.js')
import * as types from '../../src/js/constants'
import requestEdit from '../../src/js/actions/requestEdit.js'

describe('requestEdit', () => {
  it('creates an action to signal a request for an edit', () => {
    expect(requestEdit()).toEqual({
      type: types.REQUEST_EDIT
    })
  })
})
