jest.unmock('../../src/js/actions/receiveUpload.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import receiveUpload from '../../src/js/actions/receiveUpload.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore({ app: { institution: { id: '123' } } })

describe('uploadComplete', () => {
  it('creates a thunk to signal upload completion', () => {
    expect(typeof receiveUpload()).toEqual('function')
  })

  it('creates an action to signal upload completion when dispatched', () => {
    store.dispatch(receiveUpload())
    expect(store.getActions()).toEqual([
      { type: types.RECEIVE_UPLOAD, id: '123' }
    ])
  })
})
