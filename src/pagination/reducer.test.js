jest.unmock('./reducer.js')
import * as types from '../constants'
import excludeTypes from '../../test-resources/excludeTypes.js'
import pagination from './reducer.js'

const defaultPagination = {}

describe('pagination reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(pagination(undefined, {})).toEqual(defaultPagination)
  })

  it('should positively update paging info on parse errors', () => {
    expect(
      pagination(defaultPagination, {
        type: types.RECEIVE_PARSE_ERRORS,
        pagination: 'parseErrorsPage'
      })
    ).toEqual({ parseErrors: 'parseErrorsPage' })
  })

  it('handles REFRESH_STATE', () => {
    expect(pagination({}, { type: types.REFRESH_STATE })).toEqual(
      defaultPagination
    )
  })

  it("shouldn't modify state on an unknown action type", () => {
    excludeTypes(types.RECEIVE_PARSE_ERRORS).forEach(v =>
      expect(pagination({}, v)).toEqual({})
    )
  })
})
