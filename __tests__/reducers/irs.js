jest.unmock('../../src/js/reducers/irs.js')
import * as types from '../../src/js/constants'
import excludeTypes from './excludeTypes.js'
import irs from '../../src/js/reducers/irs.js'

const defaultIRS = {
  isFetching: false,
  msas: [],
  summary: {}
}

describe('irs reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(irs(undefined, {})).toEqual(defaultIRS)
  })

  it('handles REQUEST_IRS', () => {
    expect(irs({}, { type: types.REQUEST_IRS })).toEqual({ isFetching: true })
  })

  it('handles RECEIVE_IRS', () => {
    expect(irs({}, { type: types.RECEIVE_IRS, msas: [] })).toEqual({
      isFetching: false,
      msas: []
    })
  })

  it('handles REFRESH_STATE', () => {
    expect(irs({}, { type: types.REFRESH_STATE })).toEqual(defaultIRS)
  })

  it("shouldn't modify state on an unknown action type", () => {
    excludeTypes(
      types.RECEIVE_IRS,
      types.REQUEST_IRS,
      types.REFRESH_STATE
    ).forEach(v => expect(irs({}, v)).toEqual({}))
  })
})
