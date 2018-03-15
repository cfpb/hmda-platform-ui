jest.unmock('./filings.js')
import * as types from '../constants'
import excludeTypes from './excludeTypes.js'
import filings from './filings.js'

const defaultFilings = {}

describe('filings reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(filings(defaultFilings, {})).toEqual(defaultFilings)
  })

  it('handles REQUEST_FILING', () => {
    expect(
      filings(
        {},
        {
          type: types.REQUEST_FILING,
          id: '2',
          period: '123'
        }
      )
    ).toEqual({
      2: {
        123: {
          isFetching: true,
          fetched: false,
          filing: null
        }
      }
    })
  })
  it('handles RECEIVE_FILING', () => {
    expect(
      filings(
        {},
        {
          type: types.RECEIVE_FILING,
          filing: { filing: { period: '123', institutionId: '2' } }
        }
      )
    ).toEqual({
      2: {
        123: {
          isFetching: false,
          fetched: true,
          filing: { filing: { period: '123', institutionId: '2' } }
        }
      }
    })
  })

  it("shouldn't modify state on an unknown action type", () => {
    excludeTypes(types.RECEIVE_FILING, types.REQUEST_FILING).forEach(v =>
      expect(filings(defaultFilings, v)).toEqual(defaultFilings)
    )
  })
})
