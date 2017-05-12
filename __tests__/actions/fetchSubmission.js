jest.unmock('../../src/js/actions/fetchSubmission.js')
import * as types from '../../src/js/constants'
import fetchSubmission from '../../src/js/actions/fetchSubmission.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import postVerify from '../../src/js/api/api'

postVerify.mockImplementation(() => Promise.resolve({status: {code: 8, message: 'postverify'}}))
const mockStore = configureMockStore([thunk])

describe('fetchSubmission', () => {
  it('checks for http errors', () => {
    expect(fetchSubmission()).toBe(true)
    expect(fetchSubmission({httpStatus: 401})).toBe(true)
    expect(fetchSubmission({})).toBe(false)
    expect(fetchSubmission({httpStatus: 200})).toBe(false)
  })
})
