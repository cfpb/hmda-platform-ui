jest.unmock('../../src/js/actions/fetchEachEdit.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import fetchEachEdit from '../../src/js/actions/fetchEachEdit.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])

describe('fetchEachEdit', () => {
  it('is mocked', () => {})
})
