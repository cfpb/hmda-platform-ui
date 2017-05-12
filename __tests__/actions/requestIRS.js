jest.unmock('../../src/js/actions/requestIRS.js')
import * as types from '../../src/js/constants'
import requestIRS from '../../src/js/actions/requestIRS.js'

describe('requestIRS', () => {
  it('creates an action to signal a request for the IRS report', () => {
    expect(requestIRS()).toEqual({
      type: types.REQUEST_IRS
    })
  })
})
