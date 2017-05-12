jest.unmock('../../src/js/actions/fetchNewSubmission.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import fetchNewSubmission from '../../src/js/actions/fetchNewSubmission.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import postVerify from '../../src/js/api/api'

postVerify.mockImplementation(() => Promise.resolve({status: {code: 8, message: 'postverify'}}))
const mockStore = configureMockStore([thunk])

describe('fetchNewSubmission', () => {
  it('checks for http errors', () => {
    expect(fetchNewSubmission()).toBe(true)
    expect(fetchNewSubmission({httpStatus: 401})).toBe(true)
    expect(fetchNewSubmission({})).toBe(false)
    expect(fetchNewSubmission({httpStatus: 200})).toBe(false)
  })
})
