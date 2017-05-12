jest.unmock('../../src/js/actions/fetchSummary.js')
import * as types from '../../src/js/constants'
import fetchSummary from '../../src/js/actions/fetchSummary.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import postVerify from '../../src/js/api/api'

postVerify.mockImplementation(() => Promise.resolve({status: {code: 8, message: 'postverify'}}))
const mockStore = configureMockStore([thunk])

describe('fetchSummary', () => {
  it('checks for http errors', () => {
    expect(fetchSummary()).toBe(true)
    expect(fetchSummary({httpStatus: 401})).toBe(true)
    expect(fetchSummary({})).toBe(false)
    expect(fetchSummary({httpStatus: 200})).toBe(false)
  })
})
