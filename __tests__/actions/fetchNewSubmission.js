jest.unmock('../../src/js/actions/fetchNewSubmission.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import fetchNewSubmission from '../../src/js/actions/fetchNewSubmission.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])

describe('fetchNewSubmission', () => {
  it('is mocked', () => {})
})
