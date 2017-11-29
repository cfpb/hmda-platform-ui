jest.mock('../../src/js/utils/checkFileErrors.js')
jest.mock('../../src/js/actions/processFileErrors.js')
jest.mock('../../src/js/actions/fetchUpload.js')
jest.unmock('../../src/js/actions/handleFile.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import handleFile from '../../src/js/actions/handleFile.js'
import checkFileErrors from '../../src/js/utils/checkFileErrors.js'
import processFileErrors from '../../src/js/actions/processFileErrors.js'
import fetchUpload from '../../src/js/actions/fetchUpload.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore({ app: { institution: { id: '123' } } })

describe('handleFile', () => {
  it('creates a thunk to signal file handling', () => {
    expect(typeof handleFile()).toEqual('function')
  })

  it('presence of errors dispatches processFileErrors', () => {
    const file = {}

    checkFileErrors.mockImplementation(id => ['error'])
    processFileErrors.mockImplementation(id => {
      return { type: 'argle', errors: ['error'] }
    })
    store.dispatch(handleFile(file, 8))
    expect(store.getActions()).toEqual([{ type: 'argle', errors: ['error'] }])
  })

  it('dispatches showconfirm and selectnewfile when past uploading', () => {
    const store = mockStore({ app: { institution: { id: '123' } } })
    const file = {}

    checkFileErrors.mockImplementation(id => [])
    store.dispatch(handleFile(file, 8))
    expect(store.getActions()).toEqual([
      { type: types.SHOW_CONFIRM, showing: true },
      { type: types.SELECT_NEW_FILE, id: '123', file: {} }
    ])
  })

  it('dispatches showconfirm and selectnewfile when upload error exists', () => {
    const store = mockStore({ app: { institution: { id: '123' } } })
    const file = {}

    checkFileErrors.mockImplementation(id => [])
    store.dispatch(handleFile(file, 2, 1))
    expect(store.getActions()).toEqual([
      { type: types.SHOW_CONFIRM, showing: true },
      { type: types.SELECT_NEW_FILE, id: '123', file: {} }
    ])
  })
  it('dispatches selectfile and fetchUpload when before uploading', () => {
    const store = mockStore({ app: { institution: { id: '123' } } })
    const file = {}

    fetchUpload.mockImplementation(id => {
      return { type: 'fetchup' }
    })
    checkFileErrors.mockImplementation(id => [])
    store.dispatch(handleFile(file, 1))
    expect(store.getActions()).toEqual([
      { type: types.SELECT_FILE, id: '123', file: {} },
      { type: 'fetchup' }
    ])
  })
})
