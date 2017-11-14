jest.unmock('../../src/js/actions/fetchEachEdit.js')
jest.unmock('../../src/js/constants')
jest.mock('../../src/js/api/api')
import * as types from '../../src/js/constants'
import fetchEachFiling from '../../src/js/actions/fetchEachFiling.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getFiling } from '../../src/js/api/api.js'

const mockStore = configureMockStore([thunk])
getFiling.mockImplementation(id => Promise.resolve({ filing: 'afiling' }))

const filings = [
  {
    period: '2016'
  },
  { period: '2017' }
]

describe('fetchEachFiling', () => {
  it('fetches edits', done => {
    const store = mockStore({ app: { filingPeriod: '2017' } })

    store.dispatch(fetchEachFiling(filings)).then(() => {
      setTimeout(() => {
        expect(store.getActions()).toEqual([
          { type: 'CLEAR_FILINGS' },
          { type: 'REQUEST_FILING' },
          { type: 'RECEIVE_FILING', filing: { filing: 'afiling' } },
          { type: 'RECEIVE_FILINGS' }
        ])
        done()
      }, 0)
    })
  })
})
