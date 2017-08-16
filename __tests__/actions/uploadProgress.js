jest.unmock('../../src/js/actions/uploadProgress.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import uploadProgress from '../../src/js/actions/uploadProgress.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore({app:{ institution: {id: '123'}}})

describe('uploadProgress', () => {
  it('creates a thunk to signal upload progress', () => {
    expect(typeof uploadProgress()).toEqual('function')
  })

  it('creates an action to signal upload progress when dispatched', () => {
    store.dispatch(uploadProgress(99))
    expect(store.getActions()).toEqual([{type: types.UPLOAD_PROGRESS, percentUploaded: 99, id: '123'}])
  })
})
