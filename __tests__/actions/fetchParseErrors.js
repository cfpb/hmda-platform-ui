jest.unmock('../../src/js/actions/fetchParseErrors.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import fetchParseErrors from '../../src/js/actions/fetchParseErrors.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import postVerify from '../../src/js/api/api'

postVerify.mockImplementation(() => Promise.resolve({status: {code: 8, message: 'postverify'}}))
const mockStore = configureMockStore([thunk])

describe('fetchParseErrors', () => {
  it('checks for http errors', () => {
    expect(fetchParseErrors()).toBe(true)
    expect(fetchParseErrors({httpStatus: 401})).toBe(true)
    expect(fetchParseErrors({})).toBe(false)
    expect(fetchParseErrors({httpStatus: 200})).toBe(false)
  })
})
