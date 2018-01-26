jest.mock('../api/api')
jest.unmock('./fetchNewSubmission.js')
jest.unmock('../constants')
import * as types from '../constants'
import fetchNewSubmission from './fetchNewSubmission.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createSubmission } from '../api/api.js'

createSubmission.mockImplementation(id =>
  Promise.resolve({ id: { sequenceNumber: 4 } })
)
const mockStore = configureMockStore([thunk])

describe('fetchNewSubmission', () => {
  it('creates a thunk that will fetch summary', done => {
    const store = mockStore({})
    const remove = jest.fn()
    delete window.localStorage
    window.localStorage = { removeItem: remove }

    store
      .dispatch(fetchNewSubmission())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_SUBMISSION },
          {
            type: types.RECEIVE_SUBMISSION,
            id: { sequenceNumber: 4 }
          }
        ])
        expect(remove.mock.calls.length).toBe(2)
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
    const remove = jest.fn()
    delete window.localStorage
    window.localStorage = { removeItem: remove }

    createSubmission.mockImplementation(id =>
      Promise.resolve({ status: 404, statusText: 'argle' })
    )

    store
      .dispatch(fetchNewSubmission())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_SUBMISSION },
          {
            type: types.RECEIVE_ERROR,
            error: { status: 404, statusText: 'argle' }
          }
        ])
        expect(remove.mock.calls.length).toBe(2)
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })
})
