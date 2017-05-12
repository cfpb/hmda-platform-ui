jest.unmock('../../src/js/actions/fetchProgress.js')
import * as types from '../../src/js/constants'
import fetchProgress from '../../src/js/actions/fetchProgress.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import postVerify from '../../src/js/api/api'

postVerify.mockImplementation(() => Promise.resolve({status: {code: 8, message: 'postverify'}}))
const mockStore = configureMockStore([thunk])

describe('fetchProgress', () => {
  it('checks for http errors', () => {
    expect(fetchProgress()).toBe(true)
    expect(fetchProgress({httpStatus: 401})).toBe(true)
    expect(fetchProgress({})).toBe(false)
    expect(fetchProgress({httpStatus: 200})).toBe(false)
  })
})
