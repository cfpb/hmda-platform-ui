jest.mock('../../src/js/api/api')
jest.unmock('../../src/js/actions/updateSignature.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import updateSignature from '../../src/js/actions/updateSignature.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { postSignature } from '../../src/js/api/api.js'

postSignature.mockImplementation(id => Promise.resolve({ status: 10 }))
const mockStore = configureMockStore([thunk])

describe('updateSignature', () => {
  it('creates a thunk that will update a signature', done => {
    const store = mockStore({})

    store
      .dispatch(updateSignature())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_SIGNATURE_POST },
          {
            type: types.RECEIVE_SIGNATURE_POST,
            receipt: undefined,
            timestamp: undefined
          },
          {
            type: types.UPDATE_STATUS,
            status: {}
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
    postSignature.mockImplementation(() =>
      Promise.resolve({ status: 404, statusText: 'argle' })
    )

    store
      .dispatch(updateSignature())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_SIGNATURE_POST },
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
