jest.mock('../api/api')
jest.unmock('./fetchIRS.js')
jest.unmock('../constants')
import * as types from '../constants'
import fetchIRS from './fetchIRS.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getIRS } from '../api/api.js'

getIRS.mockImplementation(id =>
  Promise.resolve({
    msas: 1,
    summary: 2,
    count: 3,
    total: 4,
    _links: 5
  })
)
const mockStore = configureMockStore([thunk])

describe('fetchIRS', () => {
  it('creates a thunk that will fetch irs', done => {
    const store = mockStore({})

    store
      .dispatch(fetchIRS())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_IRS },
          {
            type: types.RECEIVE_IRS,
            msas: 1,
            summary: 2,
            pagination: {
              count: 3,
              total: 4,
              _links: 5
            }
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
    getIRS.mockImplementation(id =>
      Promise.resolve({ status: 403, statusText: 'argle' })
    )

    store
      .dispatch(fetchIRS())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_IRS },
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

  it('handles 404 errors when introduced', done => {
    const store = mockStore({})
    console.error = jest.fn()
    getIRS.mockImplementation(id =>
      Promise.resolve({ status: 404, statusText: 'argle' })
    )

    store
      .dispatch(fetchIRS())
      .then(() => {
        expect(store.getActions()).toEqual([{ type: types.REQUEST_IRS }])
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })
})
