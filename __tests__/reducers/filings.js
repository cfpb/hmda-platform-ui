import * as types from '../../src/js/constants'
import excludeTypes from './excludeTypes.js'
import filings from '../../src/js/reducers/filings.js'

const defaultFilings = {
  filings: [],
  isFetching: false,
}

describe('filings reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(
      filings(undefined, defaultFilings)
    ).toEqual(defaultFilings)
  })

  it('handles RECEIVE_FILING', () => {
    expect(
      filings({filings: [1,2,3]}, {type: types.RECEIVE_FILING, filing:4})
    ).toEqual({filings: [1,2,3,4]})
  })

  it('handles RECEIVE_FILINGS', () => {
    expect(
      filings({filings: [1,2,3]}, {type: types.RECEIVE_FILINGS})
    ).toEqual({filings: [1,2,3], isFetching: false})
  })

  it('handles CLEAR_FILINGS', () => {
    expect(
      filings({filings:[1,2,3]}, {type: types.CLEAR_FILINGS})
    ).toEqual(defaultFilings)
  })

  it('shouldn\'t modify state on an unknown action type', () => {
    excludeTypes(types.RECEIVE_FILING, types.RECEIVE_FILINGS,
      types.REQUEST_FILING, types.CLEAR_FILINGS)
      .forEach(v => expect(filings(defaultFilings, v))
        .toEqual(defaultFilings)
      )
  })

})
