jest.unmock('../../src/js/actions/fetchSignature.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import fetchSignature from '../../src/js/actions/fetchSignature.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const mockStore = configureMockStore([thunk])

describe('fetchSignature', () => {
  it('is mocked', () => {})
})
