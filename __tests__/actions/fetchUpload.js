jest.mock('../../src/js/api/api')
jest.unmock('../../src/js/actions/fetchUpload.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import fetchUpload from '../../src/js/actions/fetchUpload.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { postUpload } from '../../src/js/api/api.js'

postUpload.mockImplementation(id => Promise.resolve({ status: 'cool' }))
const mockStore = configureMockStore([thunk])

describe('fetchUpload', () => {
  it('creates a thunk that will fetch edits by type', done => {
    const store = mockStore({ app: { institution: { id: '123' } } })

    store
      .dispatch(fetchUpload({ aFile: 'f' }))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_UPLOAD, id: '123' },
          {
            type: types.RECEIVE_UPLOAD,
            id: '123'
          },
          {
            type: types.UPDATE_STATUS,
            status: 'cool'
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
    const store = mockStore({ app: { institution: { id: '123' } } })
    console.error = jest.fn()
    postUpload.mockImplementation(id =>
      Promise.resolve({ status: 404, statusText: 'argle' })
    )

    store
      .dispatch(fetchUpload({}))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_UPLOAD, id: '123' },
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
