jest.unmock('./requestFiling.js')
jest.unmock('../constants')
import * as types from '../constants'
import requestFiling from './requestFiling.js'

describe('requestFiling', () => {
  it('creates an action to signal a request for the relevant filing', () => {
    expect(requestFiling()).toEqual({
      type: types.REQUEST_FILING
    })
  })
})
