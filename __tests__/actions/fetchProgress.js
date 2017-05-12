jest.unmock('../../src/js/actions/fetchProgress.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import fetchProgress from '../../src/js/actions/fetchProgress.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const mockStore = configureMockStore([thunk])

describe('fetchProgress', () => {
  it('is mocked', () => {

  })
})
