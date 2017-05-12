jest.unmock('../../src/js/actions/fetchPage.js')
import * as types from '../../src/js/constants'
import fetchPage from '../../src/js/actions/fetchPage.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import postVerify from '../../src/js/api/api'

postVerify.mockImplementation(() => Promise.resolve({status: {code: 8, message: 'postverify'}}))
const mockStore = configureMockStore([thunk])

describe('fetchPage', () => {
  it('checks for http errors', () => {
    expect(fetchPage()).toBe(true)
    expect(fetchPage({httpStatus: 401})).toBe(true)
    expect(fetchPage({})).toBe(false)
    expect(fetchPage({httpStatus: 200})).toBe(false)
  })
})
