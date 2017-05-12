jest.unmock('../../src/js/actions/fetchVerify.js')
import * as types from '../../src/js/constants'
import fetchVerify from '../../src/js/actions/fetchVerify.js'
import configureMockStore from 'redux-mock-store'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import postVerify from '../../src/js/api/api'

postVerify.mockImplementation(() => Promise.resolve({status: {code: 8, message: 'postverify'}}))
const mockStore = configureMockStore([thunk])

import thunk from 'redux-thunk'
import postVerify from '../../src/js/api/api'

postVerify.mockImplementation(() => Promise.resolve({status: {code: 8, message: 'postverify'}}))
const mockStore = configureMockStore([thunk])

describe('fetchVerify', () => {
  it('creates a thunk that will post to the quality endpoint', () => {
    const store = mockStore({})
    store.dispatch(fetchVerify('quality', true))
      .then(() => {
        expect(store.getActions()).toEqual([
          {type: types.VERIFY_QUALITY, checked: true},
          {type: types.UPDATE_STATUS, status: {code: 8, message: 'postverify'}}
          ])
      })
  })
})
