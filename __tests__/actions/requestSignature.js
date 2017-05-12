jest.unmock('../../src/js/actions/requestSignature.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import requestSignature from '../../src/js/actions/requestSignature.js'

describe('requestSignature', () => {
  it('creates an action to signal a request for the signature', () => {
    expect(requestSignature()).toEqual({
      type: types.REQUEST_SIGNATURE
    })
  })
})
