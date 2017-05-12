jest.unmock('../../src/js/actions/fetchSignature.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import fetchSignature from '../../src/js/actions/fetchSignature.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import postVerify from '../../src/js/api/api'

postVerify.mockImplementation(() => Promise.resolve({status: {code: 8, message: 'postverify'}}))
const mockStore = configureMockStore([thunk])

describe('fetchSignature', () => {
  it('checks for http errors', () => {
    expect(fetchSignature()).toBe(true)
    expect(fetchSignature({httpStatus: 401})).toBe(true)
    expect(fetchSignature({})).toBe(false)
    expect(fetchSignature({httpStatus: 200})).toBe(false)
  })
})
