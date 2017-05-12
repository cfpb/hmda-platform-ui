jest.unmock('../../src/js/actions/fetchEachInstitution.js')
import * as types from '../../src/js/constants'
import fetchEachInstitution from '../../src/js/actions/fetchEachInstitution.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import postVerify from '../../src/js/api/api'

postVerify.mockImplementation(() => Promise.resolve({status: {code: 8, message: 'postverify'}}))
const mockStore = configureMockStore([thunk])

describe('fetchEachInstitution', () => {
  it('checks for http errors', () => {
    expect(fetchEachInstitution()).toBe(true)
    expect(fetchEachInstitution({httpStatus: 401})).toBe(true)
    expect(fetchEachInstitution({})).toBe(false)
    expect(fetchEachInstitution({httpStatus: 200})).toBe(false)
  })
})
