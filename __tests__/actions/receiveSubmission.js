jest.unmock('../../src/js/actions/receiveSubmission.js')
import * as types from '../../src/js/constants'
import receiveSubmission from '../../src/js/actions/receiveSubmission.js'

describe('receiveSubmission', () => {
  it('creates an action to signal current submission data has been received', () => {
    const data = {
      id: {
        sequenceNumber: 2
      }
    }
    expect(receiveSubmission(data)).toEqual({
      type: types.RECEIVE_SUBMISSION,
      ...data
    })
  })
})
