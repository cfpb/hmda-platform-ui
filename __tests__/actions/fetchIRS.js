jest.unmock('../../src/js/actions/fetchIRS.js')
import * as types from '../../src/js/constants'
import fetchIRS from '../../src/js/actions/fetchIRS.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import postVerify from '../../src/js/api/api'

postVerify.mockImplementation(() => Promise.resolve({status: {code: 8, message: 'postverify'}}))
const mockStore = configureMockStore([thunk])

describe('fetchIRS', () => {
  it('checks for http errors', () => {
    expect(fetchIRS()).toBe(true)
    expect(fetchIRS({httpStatus: 401})).toBe(true)
    expect(fetchIRS({})).toBe(false)
    expect(fetchIRS({httpStatus: 200})).toBe(false)
  })
})
