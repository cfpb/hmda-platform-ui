jest.unmock('./receiveFilings.js')
jest.unmock('../constants')
import * as types from '../constants'
import receiveFilings from './receiveFilings.js'

describe('receiveFilings', () => {
  it('creates an action to signal all filings have been acquired', () => {
    expect(receiveFilings()).toEqual({
      type: types.RECEIVE_FILINGS
    })
  })
})
