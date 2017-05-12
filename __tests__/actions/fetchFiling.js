jest.unmock('../../src/js/actions/fetchFiling.js')
import * as types from '../../src/js/constants'
import fetchFiling from '../../src/js/actions/fetchFiling.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import postVerify from '../../src/js/api/api'

postVerify.mockImplementation(() => Promise.resolve({status: {code: 8, message: 'postverify'}}))
const mockStore = configureMockStore([thunk])

describe('fetchFiling', () => {
  it('checks for http errors', () => {
    expect(fetchFiling()).toBe(true)
    expect(fetchFiling({httpStatus: 401})).toBe(true)
    expect(fetchFiling({})).toBe(false)
    expect(fetchFiling({httpStatus: 200})).toBe(false)
  })
})
