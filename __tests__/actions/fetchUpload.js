jest.unmock('../../src/js/actions/fetchUpload.js')
jest.unmock('../../src/js/constants')
jest.mock('../../src/js/api/getUploadUrl')
import * as types from '../../src/js/constants'
import fetchUpload from '../../src/js/actions/fetchUpload.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])

delete global.XMLHttpRequest
const xhrMock = {
    open: jest.fn(),
    send: jest.fn(),
    addEventListener: jest.fn(),
    setRequestHeader: jest.fn(),
    upload: {
      addEventListener: jest.fn()
    }
  }
const xhrMockFn = jest.fn(() => xhrMock)

global.XMLHttpRequest = xhrMockFn
global.window.XMLHttpRequest = global.XMLHttpRequest

describe('fetchUpload', () => {
  it('creates a thunk that will kick off a file upload', done => {
    const store = mockStore({upload: {}})
    store.dispatch(fetchUpload({name: 'afile'}))
      .then(() => {
        expect(store.getActions()).toEqual([
          {
            type: types.UPLOAD_START
          }
        ])

        expect(xhrMock.open.mock.calls.length).toBe(1)
        expect(xhrMock.setRequestHeader.mock.calls.length).toBe(3)
        expect(xhrMock.send.mock.calls.length).toBe(1)
        expect(xhrMock.addEventListener.mock.calls.length).toBe(2)
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })
})
