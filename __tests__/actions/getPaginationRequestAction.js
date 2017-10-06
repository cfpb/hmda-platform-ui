jest.unmock('../../src/js/actions/getPaginationRequestAction.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import getPaginationRequestAction from '../../src/js/actions/getPaginationRequestAction.js'

describe('getPaginationRequestAction', () => {
  it('gets the correct request actions', () => {
    expect(getPaginationRequestAction('parseErrors')).toEqual({
      type: types.REQUEST_PARSE_ERRORS
    })
    expect(getPaginationRequestAction('q021')).toEqual({
      type: types.REQUEST_EDIT,
      edit: 'q021'
    })
  })
})
