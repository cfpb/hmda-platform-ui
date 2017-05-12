jest.unmock('../../src/js/actions/clearFilings.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import clearFilings from '../../src/js/actions/clearFilings.js'

describe('clearFilings', () => {
  it('creates an action to signal that stored filings should be cleared', () => {
    expect(clearFilings()).toEqual({
      type: types.CLEAR_FILINGS
    })
  })
})
