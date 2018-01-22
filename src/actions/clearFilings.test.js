jest.unmock('./clearFilings.js')
jest.unmock('../constants')
import * as types from '../constants'
import clearFilings from './clearFilings.js'

describe('clearFilings', () => {
  it('creates an action to signal that stored filings should be cleared', () => {
    expect(clearFilings()).toEqual({
      type: types.CLEAR_FILINGS
    })
  })
})
