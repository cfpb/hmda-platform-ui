jest.unmock('../../src/js/actions/receiveSubmission.js')
import * as types from '../../src/js/constants'
import receiveSubmission from '../../src/js/actions/receiveSubmission.js'

describe('receiveSubmission', () => {
  it('checks for http errors', () => {
    expect(receiveSubmission()).toBe(true)
    expect(receiveSubmission({httpStatus: 401})).toBe(true)
    expect(receiveSubmission({})).toBe(false)
    expect(receiveSubmission({httpStatus: 200})).toBe(false)
  })
})
