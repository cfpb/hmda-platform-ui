jest.mock('../../utils/checkFileErrors.js')
jest.mock('./processFileErrors.js')
jest.mock('./fetchUpload.js')
jest.unmock('./handleFile.js')
jest.unmock('../../constants')
import * as types from '../../constants'
import handleFile from './handleFile.js'
import checkFileErrors from '../../utils/checkFileErrors.js'
import processFileErrors from './processFileErrors.js'
import fetchUpload from './fetchUpload.js'

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
