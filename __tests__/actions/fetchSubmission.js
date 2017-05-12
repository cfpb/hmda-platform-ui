jest.unmock('../../src/js/actions/fetchSubmission.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import fetchSubmission from '../../src/js/actions/fetchSubmission.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])

describe('fetchSubmission', () => {
  it('is mocked', () => {

  })
})
