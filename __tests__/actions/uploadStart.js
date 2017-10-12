jest.unmock('../../src/js/actions/uploadStart.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import uploadStart from '../../src/js/actions/uploadStart.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore({ app: { institution: { id: '123' } } })

describe('uploadStart', () => {
  it('creates a thunk to signal the start of the file upload', () => {
    expect(typeof uploadStart()).toEqual('function')
  })

  it('creates an action to signal the start of the fule upload when dispatched', () => {
    store.dispatch(uploadStart())
    expect(store.getActions()).toEqual([
      { type: types.UPLOAD_START, id: '123' }
    ])
  })
})
