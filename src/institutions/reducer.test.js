jest.unmock('./reducer.js')
import * as types from '../constants'
import excludeTypes from '../../test-resources/excludeTypes.js'
import institutions from './reducer.js'

describe('institutions reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(institutions(undefined, {})).toEqual({})
  })

  it('handles REQUEST_INSTITUTIONS', () => {
    expect(institutions({}, { type: types.REQUEST_INSTITUTIONS })).toEqual({
      isFetching: true
    })
  })

  it('handles RECEIVE_INSTITUTIONS', () => {
    expect(
      institutions(
        {},
        { type: types.RECEIVE_INSTITUTIONS, institutions: [{ id: '1' }] }
      )
    ).toEqual({ isFetching: false, institutions: [{ id: '1' }] })
  })

  it("shouldn't modify state on an unknown action type", () => {
    excludeTypes(
      types.RECEIVE_INSTITUTIONS,
      types.REQUEST_INSTITUTIONS
    ).forEach(v => expect(institutions({}, v)).toEqual({}))
  })
})
