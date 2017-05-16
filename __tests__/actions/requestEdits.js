jest.unmock('../../src/js/actions/requestEdits.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import requestEdits from '../../src/js/actions/requestEdits.js'

describe('requestEdits', () => {
  it('creates an action to signal a request for edits', () => {
    expect(requestEdits()).toEqual({
      type: types.REQUEST_EDITS
    })
  })
})
