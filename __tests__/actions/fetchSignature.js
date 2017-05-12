jest.unmock('../../src/js/actions/fetchSignature.js')
import * as types from '../../src/js/constants'
import fetchSignature from '../../src/js/actions/fetchSignature.js'

describe('fetchSignature', () => {
  it('checks for http errors', () => {
    expect(fetchSignature()).toBe(true)
    expect(fetchSignature({httpStatus: 401})).toBe(true)
    expect(fetchSignature({})).toBe(false)
    expect(fetchSignature({httpStatus: 200})).toBe(false)
  })
})
