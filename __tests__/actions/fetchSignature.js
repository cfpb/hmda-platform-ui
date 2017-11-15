jest.mock('../../src/js/api/api')
jest.unmock('../../src/js/actions/fetchSignature.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import fetchSignature from '../../src/js/actions/fetchSignature.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getSignature } from '../../src/js/api/api.js'

getSignature.mockImplementation(id =>
  Promise.resolve({ timestamp: 1, receipt: 2, status: 3 })
)
const mockStore = configureMockStore([thunk])

describe('fetchSignature', () => {
  it('creates a thunk that will fetch signature', done => {
    const store = mockStore({})

    store
      .dispatch(fetchSignature())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_SIGNATURE },
          {
            type: types.RECEIVE_SIGNATURE,
            timestamp: 1,
            receipt: 2
          },
          {
            type: types.UPDATE_STATUS,
            status: 3
          }
        ])
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })
  it('handles errors when introduced', done => {
    const store = mockStore({})
    console.error = jest.fn()
    getSignature.mockImplementation(id =>
      Promise.resolve({ status: 404, statusText: 'argle' })
    )

    store
      .dispatch(fetchSignature())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_SIGNATURE },
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
