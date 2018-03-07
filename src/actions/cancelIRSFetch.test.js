jest.unmock('./cancelIRSFetch.js')
jest.unmock('../constants')
import * as types from '../constants'
import cancelIRSFetch from './cancelIRSFetch.js'

describe('cancelIRSFetch', () => {
  it('creates an action to cancel the IRS fetch', () => {
    expect(cancelIRSFetch()).toEqual({
      type: types.CANCEL_IRS_FETCH
    })
  })
})
