jest.mock('../../src/js/api/api')
jest.unmock('../../src/js/actions/fetchCSV.js')
jest.unmock('../../src/js/constants')
jest.mock('file-saver')
import * as types from '../../src/js/constants'
import fetchCSV from '../../src/js/actions/fetchCSV.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getCSV } from '../../src/js/api/api.js'

getCSV.mockImplementation((id) => Promise.resolve('a,b,c'))
const mockStore = configureMockStore([thunk])

delete window.Blob
window.Blob = jest.fn(() => {})

describe('fetchCSV', () => {
  it('creates a thunk that will request edits and trigger a csv download', done => {
    const store = mockStore({})

    store.dispatch(fetchCSV())
      .then(() => {
        expect(store.getActions()).toEqual([
          {type: types.REQUEST_CSV}
        ])
        expect(window.Blob.mock.calls.length).toBe(1)
        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })

  it('creates a thunk that will request edits and trigger a csv download when IE is detected', done => {
    const store = mockStore({})

    window.navigator.__defineGetter__('userAgent', () => 'MSIE ')

    store.dispatch(fetchCSV())
    .then(() => {
      expect(store.getActions()).toEqual([
        {type: types.REQUEST_CSV}
      ])
      expect(window.Blob.mock.calls.length).toBe(2)
      done()
    })
    .catch(err => {
      console.log(err)
      done.fail()
    })
  })
})
