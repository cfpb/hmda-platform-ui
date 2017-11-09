jest.unmock('../../src/js/actions/requestSummary.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import requestSummary from '../../src/js/actions/requestSummary.js'

describe('requestSummary', () => {
  it('creates an action to signal a request for the summary', () => {
    expect(requestSummary()).toEqual({
      type: types.REQUEST_SUMMARY
    })
  })
})
