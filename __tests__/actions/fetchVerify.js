jest.mock('../../src/js/api/api')
jest.unmock('../../src/js/actions/fetchVerify.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import fetchVerify from '../../src/js/actions/fetchVerify.js'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { postVerify } from '../../src/js/api/api.js'

postVerify.mockImplementation(() =>
  Promise.resolve({ status: { code: 8, message: 'postverify' } })
)
const mockStore = configureMockStore([thunk])

describe('fetchVerify', () => {
  it('creates a thunk that will post to the quality endpoint', done => {
    const store = mockStore({})
    store
      .dispatch(fetchVerify('quality', true))
      .then(() => {
        expect(store.getActions()).toEqual([
          { isFetching: true, type: types.REQUEST_VERIFY_QUALITY },
          { type: types.VERIFY_QUALITY, checked: true, isFetching: false },
          {
            type: types.UPDATE_STATUS,
            status: { code: 8, message: 'postverify' }
          }
        ])
        done()
      })
      .catch(e => {
        done.fail(e)
      })
  })

  it('creates a thunk that will post to the macro endpoint', done => {
    const store = mockStore({})
    store
      .dispatch(fetchVerify('macro', true))
      .then(() => {
        expect(store.getActions()).toEqual([
          { isFetching: true, type: types.REQUEST_VERIFY_MACRO },
          { type: types.VERIFY_MACRO, checked: true, isFetching: false },
          {
            type: types.UPDATE_STATUS,
            status: { code: 8, message: 'postverify' }
          }
        ])
        done()
      })
      .catch(e => {
        done.fail(e)
      })
  })
})
