jest.unmock('../../src/js/actions/fetchIRS.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import fetchIRS from '../../src/js/actions/fetchIRS.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])

describe('fetchIRS', () => {
  it('is mocked', () => {

  })
})
