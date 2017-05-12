jest.unmock('../../src/js/actions/fetchCSV.js')
import * as types from '../../src/js/constants'
import fetchCSV from '../../src/js/actions/fetchCSV.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import postVerify from '../../src/js/api/api'

postVerify.mockImplementation(() => Promise.resolve({status: {code: 8, message: 'postverify'}}))
const mockStore = configureMockStore([thunk])

describe('fetchCSV', () => {
  it('checks for http errors', () => {
    expect(fetchCSV()).toBe(true)
    expect(fetchCSV({httpStatus: 401})).toBe(true)
    expect(fetchCSV({})).toBe(false)
    expect(fetchCSV({httpStatus: 200})).toBe(false)
  })
})
