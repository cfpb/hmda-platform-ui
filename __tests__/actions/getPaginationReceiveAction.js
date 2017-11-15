jest.unmock('../../src/js/actions/getPaginationReceiveAction.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import getPaginationReceiveAction from '../../src/js/actions/getPaginationReceiveAction.js'

const pagination = {
  _links: undefined,
  count: undefined,
  total: undefined
}

const emptyParseErrors = {
  type: types.RECEIVE_PARSE_ERRORS,
  larErrors: undefined,
  transmittalSheetErrors: undefined,
  pagination
}

describe('getPaginationReceiveAction', () => {
  it('gets the correct receive actions', () => {
    expect(getPaginationReceiveAction('parseErrors', {})).toEqual(
      emptyParseErrors
    )
    expect(getPaginationReceiveAction('irs', {})).toEqual({
      type: types.RECEIVE_IRS,
      msas: undefined,
      pagination
    })
    expect(getPaginationReceiveAction('q021', {})).toEqual({
      type: types.RECEIVE_EDIT,
      edit: undefined,
      pagination
    })
  })
})
