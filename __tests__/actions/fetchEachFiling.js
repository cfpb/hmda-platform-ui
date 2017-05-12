jest.unmock('../../src/js/actions/fetchEachFiling.js')
import * as types from '../../src/js/constants'
import fetchEachFiling from '../../src/js/actions/fetchEachFiling.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import postVerify from '../../src/js/api/api'

postVerify.mockImplementation(() => Promise.resolve({status: {code: 8, message: 'postverify'}}))
const mockStore = configureMockStore([thunk])

describe('fetchEachFiling', () => {
  it('checks for http errors', () => {
    expect(fetchEachFiling()).toBe(true)
    expect(fetchEachFiling({httpStatus: 401})).toBe(true)
    expect(fetchEachFiling({})).toBe(false)
    expect(fetchEachFiling({httpStatus: 200})).toBe(false)
  })
})
