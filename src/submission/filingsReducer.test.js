jest.unmock('./filingsReducer.js')
import * as types from '../constants'
import excludeTypes from '../../test-resources/excludeTypes.js'
import filings from './filingsReducer.js'

const defaultFilings = {
  filings: [],
  isFetching: false,
  fetched: false
}

describe('filings reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(filings(undefined, defaultFilings)).toEqual(defaultFilings)
  })

  it('handles RECEIVE_FILING', () => {
    expect(
      filings(
        {
          filings: [
            { filing: { institutionId: '3' } },
            { filing: { institutionId: '1' } },
            { filing: { institutionId: '4' } }
          ]
        },
        {
          type: types.RECEIVE_FILING,
          filing: { filing: { institutionId: '2' } }
        }
      )
    ).toEqual({
      filings: [
        { filing: { institutionId: '3' } },
        { filing: { institutionId: '1' } },
        { filing: { institutionId: '4' } },
        { filing: { institutionId: '2' } }
      ]
    })
  })

  it('handles RECEIVE_FILINGS', () => {
    expect(
      filings(
        {
          filings: [
            { filing: { institutionId: '1' } },
            { filing: { institutionId: '2' } },
            { filing: { institutionId: '3' } }
          ]
        },
        { type: types.RECEIVE_FILINGS }
      )
    ).toEqual({
      filings: [
        { filing: { institutionId: '1' } },
        { filing: { institutionId: '2' } },
        { filing: { institutionId: '3' } }
      ],
      isFetching: false,
      fetched: true
    })
  })

  it('handles CLEAR_FILINGS', () => {
    expect(
      filings(
        {
          filings: [
            { filing: { institutionId: '1' } },
            { filing: { institutionId: '2' } },
            { filing: { institutionId: '3' } }
          ]
        },
        { type: types.CLEAR_FILINGS }
      )
    ).toEqual(defaultFilings)
  })

  it('handles REFRESH_FILINGS', () => {
    expect(filings({}, { type: types.REFRESH_STATE })).toEqual(defaultFilings)
  })

  it("shouldn't modify state on an unknown action type", () => {
    excludeTypes(
      types.RECEIVE_FILING,
      types.RECEIVE_FILINGS,
      types.REQUEST_FILING,
      types.CLEAR_FILINGS,
      types.REFRESH_STATE
    ).forEach(v => expect(filings(defaultFilings, v)).toEqual(defaultFilings))
  })
})
