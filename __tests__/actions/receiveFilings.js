jest.unmock('../../src/js/actions/receiveFilings.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import receiveFilings from '../../src/js/actions/receiveFilings.js'

describe('receiveFilings', () => {
  it('creates an action to signal all filings have been acquired', () => {
    expect(receiveFilings()).toEqual({
      type: types.RECEIVE_FILINGS
    })
  })
})
