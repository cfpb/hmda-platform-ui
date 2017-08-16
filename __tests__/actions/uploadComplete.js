jest.unmock('../../src/js/actions/uploadComplete.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import uploadComplete from '../../src/js/actions/uploadComplete.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore({app:{ institution: {id: '123'}}})

describe('uploadComplete', () => {
  it('creates a thunk to signal upload completion', () => {
    expect(typeof uploadComplete()).toEqual('function')
  })

  it('creates an action to signal upload completion when dispatched', () => {
    const event = {}
    store.dispatch(uploadComplete(event))
    expect(store.getActions()).toEqual([{type: types.UPLOAD_COMPLETE, xhrLoadEvent: event, id: '123'}])
  })
})
