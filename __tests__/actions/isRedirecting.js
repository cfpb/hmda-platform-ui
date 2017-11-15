jest.unmock('../../src/js/actions/isRedirecting.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import isRedirecting from '../../src/js/actions/isRedirecting.js'

describe('isRedirecting', () => {
  it('creates an action to signal redirecting status', () => {
    expect(isRedirecting(true)).toEqual({
      type: types.REDIRECTING,
      redirecting: true
    })
  })
})
