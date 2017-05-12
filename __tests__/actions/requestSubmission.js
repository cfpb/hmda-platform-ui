jest.unmock('../../src/js/actions/requestSubmission.js')
import * as types from '../../src/js/constants'
import requestSubmission from '../../src/js/actions/requestSubmission.js'

describe('requestSubmission', () => {
  it('creates an action to signal a request for submission', () => {
    expect(requestSubmission()).toEqual({
      type: types.REQUEST_SUBMISSION
    })
  })
})
