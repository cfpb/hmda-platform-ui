jest.mock('../api/api')
jest.mock('file-saver')
jest.unmock('./fetchIRSCSV.js')
jest.unmock('../constants')
import * as types from '../constants'
import fetchIRSCSV from './fetchIRSCSV.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getIRSCSV } from '../api/api.js'

getIRSCSV.mockImplementation(id => Promise.resolve('c,s,v'))
const mockStore = configureMockStore([thunk])

describe('fetchIRSCSV', () => {
  it('creates a thunk that will fetch irs csv', done => {
    const store = mockStore({})

    store
      .dispatch(fetchIRSCSV())
      .then(() => {
        expect(store.getActions()).toEqual([{ type: types.REQUEST_IRS_CSV }])
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
    getIRSCSV.mockImplementation(id =>
      Promise.resolve({ status: 403, statusText: 'argle' })
    )

    store
      .dispatch(fetchIRSCSV())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_IRS_CSV },
          {
            type: types.RECEIVE_ERROR,
            error: { status: 403, statusText: 'argle' }
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
