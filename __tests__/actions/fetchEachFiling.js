jest.unmock('../../src/js/actions/fetchEachFiling.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import fetchEachFiling from '../../src/js/actions/fetchEachFiling.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const mockStore = configureMockStore([thunk])

describe('fetchEachFiling', () => {
  it('is mocked', () => {

  })
})
