jest.mock('../../src/js/api/api')
jest.unmock('../../src/js/actions/fetchEdits.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import fetchEdits from '../../src/js/actions/fetchEdits.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getEdits } from '../../src/js/api/api.js'

getEdits.mockImplementation(id => Promise.resolve({ fakeEdits: 1 }))
const mockStore = configureMockStore([thunk])

describe('fetchEdits', () => {
  it('creates a thunk that will fetch edits by type', done => {
    const store = mockStore({})

    store
      .dispatch(fetchEdits())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_EDITS },
          {
            type: types.RECEIVE_EDITS,
            edits: { fakeEdits: 1 }
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
    getEdits.mockImplementation(id =>
      Promise.resolve({ status: 404, statusText: 'argle' })
    )

    store
      .dispatch(fetchEdits())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_EDITS },
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
