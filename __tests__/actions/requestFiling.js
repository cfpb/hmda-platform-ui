jest.unmock('../../src/js/actions/requestFiling.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import requestFiling from '../../src/js/actions/requestFiling.js'

describe('requestFiling', () => {
  it('creates an action to signal a request for the relevant filing', () => {
    expect(requestFiling()).toEqual({
      type: types.REQUEST_FILING
    })
  })
})
