jest.mock('../../src/js/api/api')
jest.unmock('../../src/js/actions/fetchParseErrors.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import fetchParseErrors from '../../src/js/actions/fetchParseErrors.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getParseErrors } from '../../src/js/api/api.js'

getParseErrors.mockImplementation(id =>
  Promise.resolve({
    transmittalSheetErrors: 1,
    larErrors: 2,
    count: 3,
    total: 4,
    _links: 5
  })
)
const mockStore = configureMockStore([thunk])

describe('fetchParseErrors', () => {
  it('creates a thunk that will fetch parse errors', done => {
    const store = mockStore({})

    store
      .dispatch(fetchParseErrors())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_PARSE_ERRORS },
          {
            type: types.RECEIVE_PARSE_ERRORS,
            transmittalSheetErrors: 1,
            larErrors: 2,
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
    getParseErrors.mockImplementation(id =>
      Promise.resolve({ status: 404, statusText: 'argle' })
    )

    store
      .dispatch(fetchParseErrors())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.REQUEST_PARSE_ERRORS },
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
