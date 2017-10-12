jest.unmock('../../src/js/actions/fetchParseErrors.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import fetchParseErrors from '../../src/js/actions/fetchParseErrors.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])

describe('fetchParseErrors', () => {
  it('is mocked', () => {})
})
