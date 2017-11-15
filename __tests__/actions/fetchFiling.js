jest.mock('../../src/js/api/api')
jest.unmock('../../src/js/actions/fetchFiling.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import fetchFiling from '../../src/js/actions/fetchFiling.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getFiling } from '../../src/js/api/api.js'

getFiling.mockImplementation(id => Promise.resolve({ filing: 1 }))
const mockStore = configureMockStore([thunk])

describe('fetchFiling', () => {
  it('creates a thunk that will fetch a filing', done => {
    const store = mockStore({})

    store
      .dispatch(fetchFiling({ institutionId: '123', period: '2017' }))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_FILING },
          {
            type: types.RECEIVE_FILING,
            filing: { filing: 1 }
          }
        ])
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })
  it('handled errors when introduced', done => {
    const store = mockStore({})
    console.error = jest.fn()
    getFiling.mockImplementation(id =>
      Promise.resolve({ status: 404, statusText: 'argle' })
    )

    store
      .dispatch(fetchFiling({ institutionId: '123', period: '2017' }))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_FILING },
          {
            type: types.RECEIVE_ERROR,
            error: { status: 404, statusText: 'argle' }
          }
        ])
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })
})
