jest.unmock('../../src/js/actions/fetchFiling.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import fetchFiling from '../../src/js/actions/fetchFiling.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])

describe('fetchFiling', () => {
  it('is mocked', () => {})
})
