jest.unmock('../../src/js/actions/fetchUpload.js')
import * as types from '../../src/js/constants'
import fetchUpload from '../../src/js/actions/fetchUpload.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import postVerify from '../../src/js/api/api'

postVerify.mockImplementation(() => Promise.resolve({status: {code: 8, message: 'postverify'}}))
const mockStore = configureMockStore([thunk])

describe('fetchUpload', () => {
  it('checks for http errors', () => {
    expect(fetchUpload()).toBe(true)
    expect(fetchUpload({httpStatus: 401})).toBe(true)
    expect(fetchUpload({})).toBe(false)
    expect(fetchUpload({httpStatus: 200})).toBe(false)
  })
})
