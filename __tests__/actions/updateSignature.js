jest.unmock('../../src/js/actions/updateSignature.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import updateSignature from '../../src/js/actions/updateSignature.js'

describe('updateSignature', () => {
  it('checks for http errors', () => {
    expect(updateSignature()).toBe(true)
    expect(updateSignature({httpStatus: 401})).toBe(true)
    expect(updateSignature({})).toBe(false)
    expect(updateSignature({httpStatus: 200})).toBe(false)
  })
})
