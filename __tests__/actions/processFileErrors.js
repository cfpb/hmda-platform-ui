jest.unmock('../../src/js/actions/processFileErrors.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import processFileErrors from '../../src/js/actions/processFileErrors.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore({ app: { institution: { id: '123' } } })

describe('processFileErrors', () => {
  it('creates a thunk to signal processing of file errors', () => {
    expect(typeof processFileErrors()).toEqual('function')
  })

  it('creates an action to signal file processing when dispatched', () => {
    const errors = ['qwe']
    store.dispatch(processFileErrors(errors))
    expect(store.getActions()).toEqual([
      { type: types.RECEIVE_FILE_ERRORS, errors, id: '123' }
    ])
  })
})
