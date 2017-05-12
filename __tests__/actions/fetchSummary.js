jest.unmock('../../src/js/actions/fetchSummary.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import fetchSummary from '../../src/js/actions/fetchSummary.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])

describe('fetchSummary', () => {
  it('is mocked', () => {

  })
})
