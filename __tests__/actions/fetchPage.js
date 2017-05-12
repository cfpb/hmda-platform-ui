jest.mock('../../src/js/api/fetch')
jest.unmock('../../src/js/actions/fetchPage.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import fetchPage from '../../src/js/actions/fetchPage.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { fetch } from '../../src/js/api/fetch.js'

fetch.mockImplementation((pathObj) => Promise.resolve({bargle:'foo'}))
const mockStore = configureMockStore([thunk])

const emptyParseErrors = {
  type: types.RECEIVE_PARSE_ERRORS,
  larErrors: undefined,
  transmittalSheetErrors: undefined,
  pagination: {
    count: undefined,
    total: undefined,
    _links: undefined
  }
}

describe('fetchPage', () => {
  it('creates a thunk that will fetch a page by pathname and select sub actions', done => {
    const store = mockStore({})

    store.dispatch(fetchPage('parseErrors', '/argle'))
      .then(() => {
        expect(store.getActions()).toEqual([
          {type: types.REQUEST_PARSE_ERRORS},
          emptyParseErrors
        ])
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })
})
