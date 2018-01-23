jest.unmock('./requestIRS.js')
jest.unmock('../../constants')
import * as types from '../../constants'
import requestIRS from './requestIRS.js'

describe('requestIRS', () => {
  it('creates an action to signal a request for the IRS report', () => {
    expect(requestIRS()).toEqual({
      type: types.REQUEST_IRS
    })
  })
})
