jest.unmock('../../src/js/actions/selectFile.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import selectFile from '../../src/js/actions/selectFile.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore({app:{ institution: {id: '123'}}})

describe('selectFile', () => {
  it('creates a thunk to signal file selection', () => {
    expect(typeof selectFile()).toEqual('function')
  })

  it('creates an action to signal file selection when dispatched', () => {
    const file = {size:42, name: 'test.txt'}
    store.dispatch(selectFile(file))
    expect(store.getActions()).toEqual([{type: types.SELECT_FILE, file, errors: [], id: '123'}])
  })
})
